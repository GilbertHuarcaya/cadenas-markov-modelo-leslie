import Operacion from "@/components/operations/Operation";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-24">
      <h1 className="text-2xl text-center title">
        Aplicación del modelo poblacional de Leslie
      </h1>
      <Link href="/presentation" className="button-primary">
        Mostrar Presentacion de los Integrantes
      </Link>
      <Link href="/especies" className="button-primary">
        Mostrar Lista de Especies
      </Link>
      <h2 className="title">Explicación </h2>
      <p className="text-justify">
        El modelo de Leslie es un modelo discreto matricial, que refleja la
        evolución de una población estructurada en clases de edad considerando
        las tasas de natalidad, mortalidad y las probabilidades de pasar de una
        clase de edad a otra subsecuente. En este caso se tiene una matriz de
        transición cuya primer fila contiene las tasas de reproducción
        correspondiente a cada clase de edad y en las demás, la probabilidad de
        transición entre una clase y otra. Además se tiene un vector que muestra la población actual de cada clase de edad.
        Finalmente se define la cantidad de periodos o años a simular.
      </p>
      <Operacion />
    </main>
  );
}
