"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "number",
    header: "NFS-e Number",
  },
  {
    accessorKey: "date",
    header: "Emission date",
  },
  {
    accessorKey: "payDate",
    header: "NFS-e Payday",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "jobType",
    header: "Service type",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "",
    header: " ",
    cell: ({ row }) => {
      console.log(row);

      return <div className="text-right font-medium">a</div>;
    },
  },
];

const handleDelete = async (id) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    mutate();
  } catch (err) {
    console.log(err);
  }
};
