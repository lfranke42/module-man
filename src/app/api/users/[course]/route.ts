import {NextRequest} from "next/server";
import {CoursePostBody, CourseUrlParams} from "@/types/api";
import {getServerSession} from "next-auth";
import prisma from "@/lib/prisma";
import {authOptions} from "@/lib/auth";

export async function POST(request: NextRequest, context: { params: CourseUrlParams }) {
  const session = await getServerSession(authOptions)

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

export async function GET(request: NextRequest, context: { params: CourseUrlParams }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const userId = session.user.id;

  const modules = await prisma.module.findMany({
    where: {
      AND: [
        {userId: userId},
        {course: context.params.course}
      ]
    }
  });

  return new Response(JSON.stringify(modules), {status: 200});
}