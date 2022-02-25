import { ITableHeaderCell } from "./types";

export const TableHeaderCells: readonly ITableHeaderCell[] = [
  {
    id: "agencyName",
    numeric: false,
    label: "Название",
  },
  {
    id: "createDate",
    numeric: true,
    label: "Дата создания",
  },
  {
    id: "phones",
    numeric: true,
    label: "Телефон",
  },
];