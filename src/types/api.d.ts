import {Module} from "@/types/kanban";

type CourseGetParams = {
  course: string;
}

type CoursePostParams = {
  course: string;
  module: Module;
  originBoard: number;
  destinationBoard: number;
}