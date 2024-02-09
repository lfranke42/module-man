'use client';

import {Header} from "@/components/header";
import {useState} from "react";
import {NoCourseSelected} from "@/components/no-course-selected";
import {KanbanBoard} from "@caldwell619/react-kanban";
import {initialBachelorBoard, initialMasterBoard} from "@/components/kanban/initialBoards";
import {CenteredKanbanBoard} from "@/components/kanban/centered-kanban-board";
import {Module} from "@/types/kanban";


export default function Home() {
  const masterCourses = ["inm", "mim"];
  const [course, setCourse] = useState<string>();
  const [board, setBoard] = useState<KanbanBoard<Module>>();

  const handleCourseUpdate = (course: string) => {
    if (masterCourses.includes(course)) {
      setBoard(initialMasterBoard)
    } else {
      setBoard(initialBachelorBoard);
    }
    setCourse(course);
  }

  return (
    <main>
      <Header handleCourseChange={handleCourseUpdate}/>
      {course === undefined || board === undefined ?
        <NoCourseSelected/> :
        <CenteredKanbanBoard board={board} course={course}></CenteredKanbanBoard>
      }
    </main>
  );
}
