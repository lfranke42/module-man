import {NextRequest, NextResponse} from "next/server";
import {promises as fs} from 'fs';
import {CourseUrlParams} from "@/types/api";

export async function GET(request: NextRequest, context: { params: CourseUrlParams }) {
  const params = context.params;
  const validCourses = ["inb", "inm", "mib-bin", "mib", "mim"]

  // Check if requested course is valid
  if (!params.course) return NextResponse.error();
  if (!validCourses.includes(params.course)) return NextResponse.error();

  // Read corresponding JSON file
  const filePath = process.cwd() + '/src/app/data/' + params.course + '.json'
  const file = await fs.readFile(filePath, 'utf8');

  return NextResponse.json(JSON.parse(file));
}

