import { Teacher } from "./teacher.model"

export interface SchoolStaff{
    totalItems:number,
    data:Teacher[],
    totalPages:number,
    currentPage:number
}
