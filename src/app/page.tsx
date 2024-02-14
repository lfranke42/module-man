'use client';

import {Header} from "@/components/header";
import {useState} from "react";
import {NoCourseSelected} from "@/components/no-course-selected";
import {CenteredKanbanBoard} from "@/components/kanban/centered-kanban-board";


export default function Home() {
  const [course, setCourse] = useState<string>();
  const [courseUpdate, setCourseUpdate] = useState<boolean>(false);

  const handleCourseUpdate = (course: string) => {
    setCourse(course);
  }

  const updateCourse = () => {
    setCourseUpdate(!courseUpdate);
  }

  return (
    <main>
      <Header handleCourseChange={handleCourseUpdate} updateCourse={updateCourse} course={course}/>
      {course === undefined ?
        <NoCourseSelected/> :
        <CenteredKanbanBoard course={course} courseUpdate={courseUpdate}></CenteredKanbanBoard>
      }
    </main>
  );
}
