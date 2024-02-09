import Module from './kanban';

export type CourseUrlParams = {
  course: string;
}

export type CoursePostBody = {
  originBoard: number,
  destinationBoard: number,
  module: Module
}

export type UserModulesGetResponse = {
  id: string,
  moduleNum: string,
  course: string,
  board: number,
  userId: string
}[]

export type UserDbModel = {
  id: string,
  moduleNum: string,
  course: string,
  board: number,
  userId: string
}