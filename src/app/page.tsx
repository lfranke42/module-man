'use client';

import {Header} from "@/components/header";
import {useState} from "react";
import {H1} from "@/components/typography/H1";

export default function Home() {
  const [selectedCourse, setCourse] = useState<string>()

  return (
    <main>
      <Header handleCourseChange={setCourse}/>
      <H1>{selectedCourse}</H1>
    </main>
  );
}
