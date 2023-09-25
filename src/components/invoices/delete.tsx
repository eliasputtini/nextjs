"use client";
const handleDelete = async (id: any, mutate: any) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    mutate();
    console.log("delete");
  } catch (err) {
    console.log(err);
  }
};

//@ts-nocheck
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/invoices/data-table";
import { columns } from "@/components/invoices/columns";

function Delete({ id }: any) {
  const session = useSession();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  return (
    <div
      className="text-right font-medium"
      onClick={() => {
        handleDelete(id, mutate);
      }}
    >
      delete
    </div>
  );
}

export default Delete;
