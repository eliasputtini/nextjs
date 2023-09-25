"use client";
import Image from "next/image";
import Hero from "public/hero.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center gap-28">
      <div className="flex flex-1 flex-col gap-14">
        <h1 className="text-7xl">Bem vindo ao Dashboard de notas fiscais</h1>
        <p className="text-2xl font-light">
          Otimize sua Gestão Financeira com o nosso organizador de Notas
          Fiscais.
        </p>
        <Link href="/dashboard">
          <Button> Cadastre uma Nota fiscal </Button>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-14">
        <Image src={Hero} alt="" className="w-full h-[700px]" />
      </div>
    </div>
  );
}
