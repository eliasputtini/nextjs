"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "number",
    header: "Status",
  },
  {
    accessorKey: "payDate",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Status",
  },
  {
    accessorKey: "payDate",
    header: "Status",
  },
  {
    accessorKey: "company",
    header: "Status",
  },
  {
    accessorKey: "jobType",
    header: "Status",
  },
  {
    accessorKey: "value",
    header: "Status",
  },
];
