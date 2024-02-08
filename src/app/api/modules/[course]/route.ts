import {NextRequest, NextResponse} from "next/server";
import {promises as fs} from 'fs';
import {CoursePostBody, CourseUrlParams} from "@/types/api";
import prisma from "@/lib/prisma";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";

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

export async function POST(request: NextRequest, context: { params: CourseUrlParams }) {
  const session = await getServerSession(authOptions)
  console.log(session)

  if (!session) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  let body;
  try {
    body = await request.json() as CoursePostBody;
    console.log(body)
  } catch (e) {
    return new Response("Invalid JSON", {status: 400});
  }

  const userId = session.user.id;
  const movedModule = body.module;
  const originBoard = body.originBoard;
  const destinationBoard = body.destinationBoard;

  try {
    // Delete module from origin board
    await prisma.module.deleteMany({
      where: {
        AND:
          [
            {userId: userId},
            {course: context.params.course},
            {board: originBoard},
            {moduleNum: movedModule.id}
          ]
      }
    });
  } catch (e) {
    return new Response("Module not found", {status: 400});
  }

  try {
    // Add module to destination board
    await prisma.module.create({
      data: {
        userId: userId,
        course: context.params.course,
        board: destinationBoard,
        moduleNum: movedModule.id,
      }
    });
  } catch (e) {
    return new Response("Module already exists", {status: 409});
  }

  return new Response("Module moved", {status: 200});
}

