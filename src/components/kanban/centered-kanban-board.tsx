import {ControlledBoard, KanbanBoard} from '@caldwell619/react-kanban'
import {useEffect, useState} from "react";
import {Module, ModuleDto} from "@/components/kanban/types";
import {ModuleCard} from "@/components/kanban/module-card";
import {CardHeader} from "@/components/ui/card";
import {ColumnHeader} from "@/components/kanban/column-header";

type BoardProps = {
  board: KanbanBoard<Module>,
  course: string,
}

export function CenteredKanbanBoard(props: BoardProps) {
  const [board, setBoard] = useState(props.board)

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
            board.columns[0].cards = modules
          }
        ))
    }
    , [props.course])


  return (
    <div className="flex justify-center mt-16 ml-16 mr-16">
      <ControlledBoard renderCard={(card: Module) => {
        return <ModuleCard ects={card.ects} id={card.id} lecturers={card.lecturers} name={card.name}
                           semester={card.semester} key={card.id}/>
      }}
                       disableColumnDrag={true}
                       allowRenameColumn={false}
                       allowAddCard={false}
                       allowRemoveCard={false}
                       allowAddColumn={true}
                       renderColumnHeader={(column) => {
                         return <ColumnHeader title={column.title}/>
                       }}
      >
        {board}
      </ControlledBoard>
    </div>

  )
}