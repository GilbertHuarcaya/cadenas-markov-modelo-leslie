import History from "@/components/species/sections/History";
import Info from "@/components/species/sections/Info";
import LongPeriod from "@/components/species/sections/LongPeriod";
import ShortPeriod from "@/components/species/sections/ShortPeriod";
import Tables from "@/components/species/sections/Tables";
import { especies } from "@/db/especies";
import { vectorHistory } from "@/db/vectorHistory";
import { Matrix } from "@/domain/classes/matrix";
import { Suspense, useRef } from "react";

export default function Especie({
  params: { id_especie },
}: {
  params: { id_especie: string };
}) {
  //Variables de la especie
  const especie = especies.find(
    (especie) => especie.id === parseInt(id_especie)
  );
  //Si la especie no existe mostrar solo mensaje
  if (!especie) {
    return <div>especie no encontrada</div>;
  }

  //Variables de la especie para renderizar informacion
  const { tasaNatalidadPromedio: TN, probabilidadDeSupervivencia: PS } =
    especie;
  const header = Object.keys(especie.poblacionInicial) as (
    | "joven"
    | "juvenil"
    | "adulto"
  )[];

  //Matriz de Leslie
  const leslieMatrix = new Matrix({
    data: [
      [TN.joven, TN.juvenil, TN.adulto],
      [PS.joven_juvenil, 0, 0],
      [0, PS.juvenil_adulto, PS.permanecer_adulto],
    ],
  });

  //Matriz de poblacion inicial
  const initialPopulationMatrix = new Matrix({
    data: Object.values(especie.poblacionInicial).map((value) => {
      return [value];
    }),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <Info especie={especie} leslieMatrix={leslieMatrix} header={header} />
      <Tables
        leslieMatrix={leslieMatrix}
        initialPopulationMatrix={initialPopulationMatrix}
      />

      <ShortPeriod
        {...{
          especie,
          leslieMatrix,
          initialPopulationMatrix,
        }}
      />

      <LongPeriod
        {...{
          especie,
          leslieMatrix,
          initialPopulationMatrix,
        }}
      />
    </main>
  );
}
