import Module from './kanban';

export type CourseUrlParams = {
  course: string;
}

export type CoursePostBody = {
  originBoard: number,
  destinationBoard: number,
  module: Module
}