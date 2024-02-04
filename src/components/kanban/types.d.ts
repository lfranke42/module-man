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