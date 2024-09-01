import calculatePredictionHistorial from "@/actions/calculatePredictionHistorial";
import LeslieMatrix from "@/components/matrix/LeslieMatrix";
import Vector from "@/components/matrix/Vector";
import { especies } from "@/db/especies";
import { vectorHistory } from "@/db/vectorHistory";
import { Matrix } from "@/domain/classes/matrix";
import Link from "next/link";

export default function Especie({
  params: { id_especie },
}: {
  params: { id_especie: string };
}) {
  const especie = especies.find(
    (especie) => especie.id === parseInt(id_especie)
  );
  const especieVectorHistory = vectorHistory.find(
    (especie) => especie.id === parseInt(id_especie)
  )?.history;

  if (!especie) {
    return <div>especie no encontrada</div>;
  }

  const { tasaNatalidadPromedio: TN, probabilidadDeSupervivencia: PS } =
    especie;
  const header = Object.keys(especie.poblacionInicial) as (
    | "joven"
    | "juvenil"
    | "adulto"
  )[];
  const vectorPoblacionInicial = Object.values(especie.poblacionInicial).map(
    (value) => {
      return [value];
    }
  );
  //    |         | joven | juvenil | adulto |
  //   | joven   | 0     | 0.2     | 0.3    | <- tasaNatalidadPromedio
  //  | juvenil | 0.8   | 0       | 0      | <- probabilidadDeSupervivencia joven_juvenil
  // | adulto  | 0     | 50      | 0      | <- probabilidadDeSupervivencia juvenil_adulto

  const leslieMatrixData = [
    [TN.joven, TN.juvenil, TN.adulto],
    [PS.joven_juvenil, 0, 0],
    [0, PS.juvenil_adulto, 0],
  ];

  const initialPopulationMatrix = new Matrix({
    rows: 0,
    cols: 0,
    data: vectorPoblacionInicial,
  });

  const leslieMatrix = new Matrix({ rows: 0, cols: 0, data: leslieMatrixData });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
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
            {header.map((key) => (
              <li key={key}>
                {key}: {especie.poblacionInicial[key]}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Tasa de Natalidad Promedio</h2>
          <ul className="list-disc list-inside">
            <li>Joven: {TN.joven}</li>
            <li>Juvenil: {TN.juvenil}</li>
            <li>Adulto: {TN.adulto}</li>
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            Probabilidad de Supervivencia
          </h2>
          <ul className="list-disc list-inside">
            <li>Joven a Juvenil: {PS.joven_juvenil}</li>
            <li>Juvenil a Adulto: {PS.juvenil_adulto}</li>
          </ul>
        </div>
      </div>
      <LeslieMatrix
        matrix={leslieMatrix}
        header={["", ...header]}
        firstCol={header}
      />
      <h2 className="text-xl font-semibold">Predicion de Población</h2>
      <form className="flex gap-4 mt-4" action={calculatePredictionHistorial}>
        <input
          type="number"
          name="periods"
          min={1}
          placeholder="Periodos"
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="leslieMatrix"
          defaultValue={JSON.stringify(leslieMatrix)}
          className="p-2 border border-gray-300 rounded-lg"
          hidden
        />
        <input
          type="text"
          name="initialPopulation"
          defaultValue={JSON.stringify(initialPopulationMatrix)}
          className="p-2 border border-gray-300 rounded-lg"
          hidden
        />
        <input
          type="number"
          name="id"
          defaultValue={parseInt(id_especie)}
          className="p-2 border border-gray-300 rounded-lg"
          hidden
        />
        <button className="p-2 bg-blue-500 text-white rounded-lg">
          Calcular
        </button>
      </form>
      <div className="flex flex-col gap-4">
        {especieVectorHistory?.map((vector, i) => {
          return (
            <>
              <h3 className="text-xl font-semibold">
                En {i + 1} periodo{i >= 1 ? "s" : ""}
              </h3>
              <div className="flex " key={i}>
                <div className="flex gap-4 items-center">
                  <LeslieMatrix matrix={leslieMatrix} />
                  <Vector
                    matrix={
                      i === 0
                        ? initialPopulationMatrix
                        : especieVectorHistory[i - 1]
                    }
                  />
                  <span>=</span>
                  <Vector matrix={i === 0 ? especieVectorHistory[0] : vector} />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </main>
  );
}
