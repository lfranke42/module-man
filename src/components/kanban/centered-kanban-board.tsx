import {ControlledBoard, KanbanBoard} from '@caldwell619/react-kanban'
import {useEffect, useState} from "react";
import {Module, ModuleDto, MoveEventDestination, MoveEventOrigin} from "@/types/kanban";
import {ModuleCard} from "@/components/kanban/module-card";
import {ColumnHeader} from "@/components/kanban/column-header";
import {useSession} from "next-auth/react";
import {CoursePostParams} from "@/types/api";

type BoardProps = {
  board: KanbanBoard<Module>,
  course: string,
}

export function CenteredKanbanBoard(props: BoardProps) {
  const [board, setBoard] = useState(props.board)

  const {data: session, status} = useSession()

  // Update Base Board when course type changes
  useEffect(() => {
    setBoard(props.board)
  }, [props.board])

  // Fetch Modules from API
  useEffect(() => {
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
          setBoard(prevState => {
            let newBoard = Object.assign({}, prevState)
            newBoard.columns[0].cards = modules
            return newBoard
          })
        }
      ))
  }, [props.course])

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

    const requestBody: CoursePostParams = {
      course: props.course,
      module: module,
      originBoard: originBoard,
      destinationBoard: destinationBoard
    }

    fetch(`/api/modules/${props.course}`, {
      method: "POST",
      body: JSON.stringify(requestBody)
    }).then(response => response.json().then(data => console.log(data)))
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