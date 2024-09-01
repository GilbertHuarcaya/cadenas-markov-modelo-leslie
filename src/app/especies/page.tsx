import { Card } from "@/components/ui/card";
import { especies } from "@/db/especies";
import Link from "next/link";
import React from "react";

const EspeciesView = () => {
  return (
    <main className="flex min-h-screen flex-col flex-wrap items-center gap-6 p-24">
      {especies.map((especie) => (
        <Link href={`/especies/${especie.id}`} key={especie.id}>
          <Card className={`p-4`}>
            <h1>{especie.nombre}</h1>
            <p>{especie.descripcion}</p>
          </Card>
        </Link>
      ))}
      <Link href="/" className="button-primary">
        Volver al inicio
      </Link>
    </main>
  );
};

export default EspeciesView;
