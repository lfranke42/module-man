'use client';

import {Header} from "@/components/header";
import {useState} from "react";
import {NoCourseSelected} from "@/components/no-course-selected";
import {CenteredKanbanBoard} from "@/components/kanban/centered-kanban-board";


export default function Home() {
  const [course, setCourse] = useState<string>();

  const handleCourseUpdate = (course: string) => {
    setCourse(course);
  }

  return (
    <main>
      <Header handleCourseChange={handleCourseUpdate}/>
      {course === undefined ?
        <NoCourseSelected/> :
        <CenteredKanbanBoard course={course}></CenteredKanbanBoard>
      }
    </main>
  );
}
