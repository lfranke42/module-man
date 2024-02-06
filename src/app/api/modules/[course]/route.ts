import {NextRequest, NextResponse} from "next/server";
import {promises as fs} from 'fs';
import {CourseGetParams, CoursePostParams} from "@/types/api";
import {getToken} from "next-auth/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, context: { params: CourseGetParams }) {
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

export async function POST(request: NextRequest, context: { params: CoursePostParams }) {
  const token = await getToken({req: request});

  if (!token) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const params = context.params;
  const userId = token.id as string;

  // TODO: Fix params containing only course

  console.log("Hello")
  console.log(params.module)

  // Delete module from origin board
  prisma.module.deleteMany({
    where: {
      AND:
        [
          {userId: userId},
          {course: params.course},
          {board: params.originBoard},
          {moduleNum: params.module.id}
        ]
    }});

  // Add module to destination board
  prisma.module.create({
    data: {
      userId: userId,
      course: params.course,
      board: params.destinationBoard,
      moduleNum: params.module.id,
    }
  });
}

