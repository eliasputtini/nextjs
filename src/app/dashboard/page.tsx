//@ts-nocheck
"use client";
import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DataTable } from "../../components/invoices/data-table";

import { columns } from "../../components/invoices/columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const session = useSession();

  const router = useRouter();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = e.target[0].value;
    const date = e.target[1].value;
    const payDate = e.target[2].value;
    const company = e.target[3].value;
    const jobType = e.target[4].value;
    const value = e.target[5].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          number,
          date,
          payDate,
          company,
          jobType,
          value,
          username: session?.data?.user?.name || "anonymous",
        }),
      });
      mutate();
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };
  // @ts-ignore
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

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col flex-1 gap-10">
          <div className="flex justify-between">
            <div>
              <p className="">Receita anual R$ {data?.totalRevenue}</p>
              <p className="">
                Faturamento restante dentro do limite do MEI R$&nbsp;
                {81000 - data?.totalRevenue}
              </p>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="p-5 bg-[#e8505b] rounded text-white font-bold">
                  Cadastre uma nota fiscal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="py-3">
                    Cadastre uma nota fiscal
                  </DialogTitle>
                  <DialogDescription>
                    <form
                      className="flex-1 flex flex-col gap-4 m-auto"
                      onSubmit={handleSubmit}
                    >
                      <Input
                        id="number"
                        placeholder="NFS-e number"
                        required
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                      <Input
                        id="date"
                        placeholder="NFS-e date"
                        required
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                      <Input
                        id="payDate"
                        placeholder="NFS-e payday"
                        required
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                      <Input
                        id="company"
                        placeholder="Company"
                        required
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                      <Input
                        id="jobType"
                        placeholder="Type of Service Provided"
                        required
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                      <Input
                        id="valor"
                        placeholder="NFS-e value"
                        required
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                      />
                      <DialogTrigger asChild>
                        <Button className="p-5 bg-[#e8505b] rounded text-white font-bold">
                          Send
                        </Button>
                      </DialogTrigger>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            {isLoading ? (
              "loading"
            ) : (
              <DataTable columns={columns} data={data.posts} mutate={mutate} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
