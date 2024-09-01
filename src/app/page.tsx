import Operacion from "@/components/operations/Operation";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <h1 className="text-2xl text-center">Aplicación de los modelos poblacionales de Leslie</h1>
      <Link href="/presentation" className="button-primary">
        Presentacion de los integrantes
      </Link>
      <Link href="/especies" className="button-primary">
        Especies
      </Link>
      <h2>Operaciones</h2>
      <Operacion />
    </main>
  );
}
