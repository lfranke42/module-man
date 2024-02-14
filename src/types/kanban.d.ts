export type ModuleDto = {
  Modulnummer: string,
  Modul: string,
  "ECTS-Leistungspunkte": number,
  Semester: string,
  Dozierende: string[],
}

export type Module = {
  id: string,
  name: string,
  ects: number,
  semester: string,
  lecturers: string[],
}

export type MoveEventOrigin = {
  fromPosition: number,
  fromColumnId?: string | number | undefined
}

export type MoveEventDestination = {
  toPosition?: number | undefined,
  toColumnId?: string | number | undefined
}

type BoardProps = {
  course: string,
  courseUpdate: boolean,
}
