import LeslieMatrix from "@/components/matrix/LeslieMatrix";
import { Matrix } from "@/domain/classes/matrix";
import Link from "next/link";
import React from "react";

const Info = ({
  especie,
  leslieMatrix,
  header,
}: {
  especie: TEspecie;
  leslieMatrix: Matrix;
  header: (keyof TPoblacionInicial)[];
}) => {
  const { tasaNatalidadPromedio: TN, probabilidadDeSupervivencia: PS } =
    especie;
  return (
    <section className="flex flex-col items-center gap-3">
      <div className="mb-1">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-bold">{especie.nombre}</h1>
          <Link href={`/especies`} className="button-primary">
            Volver
          </Link>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Población Inicial</h2>
          <ul className="list-disc list-inside">
            {header.map((key: keyof TPoblacionInicial) => (
              <li key={key}>
                {key}: {especie.poblacionInicial[key]}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Tasa de Natalidad Promedio</h2>
          <ul className="list-disc list-inside">
            <li>Joven: {TN.joven * 100} %</li>
            <li>Juvenil: {TN.juvenil * 100} %</li>
            <li>Adulto: {TN.adulto * 100} %</li>
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            Probabilidad de Supervivencia
          </h2>
          <ul className="list-disc list-inside">
            <li>Joven a Juvenil: {PS.joven_juvenil * 100} %</li>
            <li>Juvenil a Adulto: {PS.juvenil_adulto * 100} %</li>
          </ul>
        </div>
      </div>
      <LeslieMatrix
        matrix={leslieMatrix}
        header={["", ...header]}
        firstCol={header}
      />
    </section>
  );
};

export default Info;
