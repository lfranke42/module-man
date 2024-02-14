import {ControlledBoard, KanbanBoard} from '@caldwell619/react-kanban'
import {useEffect, useState} from "react";
import {BoardProps, Module, ModuleDto, MoveEventDestination, MoveEventOrigin} from "@/types/kanban";
import {ModuleCard} from "@/components/kanban/module-card";
import {ColumnHeader} from "@/components/kanban/column-header";
import {useSession} from "next-auth/react";
import {CoursePostBody, UserDbModel, UserModulesGetResponse} from "@/types/api";
import {initialBachelorBoard, initialMasterBoard} from "@/components/kanban/initialBoards";

export function CenteredKanbanBoard(props: BoardProps) {
  const [board, setBoard] = useState<KanbanBoard<Module>>(initialBachelorBoard)
  const {data: session, status} = useSession()

  // Update Base Board when course type changes
  useEffect(() => {
    const masterCourses = ["inm", "mim"];
    if (masterCourses.includes(props.course)) {
      setBoard(initialMasterBoard)
    } else {
      setBoard(initialBachelorBoard);
    }

    board.columns.forEach(column => {
      column.cards = []
    })

    fetch(`/api/modules/${props.course}`).then(
      response => response.json().then(
        (data: ModuleDto[]) => {
          const modules: Module[] = []
          data.forEach((module: ModuleDto) => {
              modules.push(
                {
                  id: module.Modulnummer,
                  name: module.Modul,
                  ects: module["ECTS-Leistungspunkte"],
                  semester: module.Semester,
                  lecturers: module.Dozierende,
                }
              )
            }
          )
          setBoard((oldBoard) => {
            let newBoard = Object.assign({}, oldBoard)
            newBoard.columns[0].cards = modules
            return newBoard
          })
        }
      )
    )

    if (status !== "authenticated") return

    fetch(`/api/users/${props.course}`).then(
      response => response.json().then((userDbModules: UserModulesGetResponse) => {
          applyUserBoardState(userDbModules)
        }
      )
    )
  }, [board.columns, status, props.course, props.courseUpdate])


  const applyUserBoardState = (userDbModules: UserDbModel[]) => {
    userDbModules.forEach((userDbModule: UserDbModel) => {
      setBoard(prevState => {
        let newBoard = Object.assign({}, prevState)
        let boardModule: Module | undefined;
        // Search for the module in the board
        newBoard.columns.forEach(column => {
          column.cards.some(card => {
            if (card.id === userDbModule.moduleNum) {
              boardModule = card;
              return true
            }
          })
        })
        if (boardModule === undefined) return prevState

        // Remove the module from the old column
        newBoard.columns.forEach(column => {
          column.cards = column.cards.filter(card => card.id !== userDbModule.moduleNum)
        })

        // Add the module to the new column
        newBoard.columns[userDbModule.board].cards.push(boardModule)

        return newBoard
      })
    })
  }


  const handleCardDrag = (
    module: Module,
    origin: MoveEventOrigin | undefined,
    destination: MoveEventDestination | undefined) => {

    if (origin === undefined || destination === undefined) return
    if (origin.fromColumnId === destination.toColumnId) return

    setBoard(prevState => {
      let newBoard = Object.assign({}, prevState)
      newBoard.columns.forEach(column => {
        if (column.id === origin.fromColumnId) {
          column.cards = column.cards.filter(card => card.id !== module.id)
        }
        if (column.id === destination.toColumnId) {
          column.cards = column.cards.filter(card => card.id !== module.id)
          column.cards.push(module)
        }
      })
      return newBoard
    })

    updateDatabase(module, origin.fromColumnId as number, destination.toColumnId as number)
  }

  const updateDatabase = (module: Module, originBoard: number, destinationBoard: number) => {
    if (status !== "authenticated") return

    const requestBody: CoursePostBody = {
      module: module,
      originBoard: originBoard,
      destinationBoard: destinationBoard
    }

    fetch(`/api/users/${props.course}`, {
      method: "POST",
      body: JSON.stringify(requestBody)
    }).catch((error) => {
      console.error('Error:', error);
    });
  }


  return (
    <div className="flex justify-center mt-16 ml-4 mr-4 sm:ml-16 sm:mr-16">
      <ControlledBoard disableColumnDrag={true}
                       allowRenameColumn={false}
                       allowAddCard={false}
                       allowRemoveCard={false}
                       allowAddColumn={true}
                       renderColumnHeader={(column) => {
                         return <ColumnHeader title={column.title} cards={column.cards}/>
                       }}
                       renderCard={(card: Module) => {
                         return <ModuleCard ects={card.ects} id={card.id} lecturers={card.lecturers} name={card.name}
                                            semester={card.semester} key={card.id}/>
                       }}
                       onCardDragEnd={(module, origin, destination) => {
                         handleCardDrag(module, origin, destination)
                       }}>
        {board}
      </ControlledBoard>
    </div>

  )
}