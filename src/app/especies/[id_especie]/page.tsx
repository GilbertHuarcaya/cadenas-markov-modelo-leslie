import calculatePredictionHistorial from "@/actions/calculatePredictionHistorial";
import calculatePredictionLong from "@/actions/calculatePredictionLong";
import ExplanationAmount from "@/components/explanation/ExplanationAmount";
import ExplanationPercentaje from "@/components/explanation/ExplanationPercentage";
import LeslieMatrix from "@/components/matrix/LeslieMatrix";
import ServerMatrix from "@/components/matrix/ServerMatrix";
import Vector from "@/components/matrix/Vector";
import { Card } from "@/components/ui/card";
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

  const lastSpecieVector = especieVectorHistory?.at(-1);

  const stationaryVector = vectorHistory.find(
    (especie) => especie.id === parseInt(id_especie)
  )?.stationaryVector;

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

  const leslieMatrixData = [
    [TN.joven, TN.juvenil, TN.adulto],
    [PS.joven_juvenil, 0, 0],
    [0, PS.juvenil_adulto, PS.permanecer_adulto],
  ];

  const initialPopulationMatrix = new Matrix({
    data: vectorPoblacionInicial,
  });

  const leslieMatrix = new Matrix({ data: leslieMatrixData });

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
            <li>
              {`Permanecer Adulto despues de un paso en el tiempo: ${
                PS.permanecer_adulto * 100
              } %`}
            </li>
          </ul>
        </div>
      </div>
      <LeslieMatrix
        matrix={leslieMatrix}
        header={["", ...header]}
        firstCol={header}
      />
      <h2 className="text-xl font-semibold">Matriz de Leslie</h2>
      <ServerMatrix matrix={leslieMatrix} rules={{ isEditable: false }} />
      <h2 className="text-xl font-semibold">Vector de Población Actual</h2>
      <Vector matrix={initialPopulationMatrix} />

      <Card className="flex flex-col p-3 gap-3">
        <h2 className="text-xl font-semibold">
          Calcular vector con la población en el periodo n
        </h2>
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
        {lastSpecieVector && lastSpecieVector !== undefined ? (
          <>
            <Card className="flex flex-col p-3 gap-3">
              <div className="flex ">
                <div className="flex gap-4 items-center">
                  <h2 className="text-xl font-semibold">
                    Vector con la poblacion en el periodo{" "}
                    {especieVectorHistory?.length}
                  </h2>
                  <Vector matrix={lastSpecieVector} rules={{ toFixed: 4 }} />
                  <div className="flex flex-col gap-3">
                    {lastSpecieVector?.getData()?.map((array, index) => (
                      <div key={index} className="flex gap-3">
                        <p>
                          {index == 0 ? "Jovenes: " : null}
                          {index == 1 ? "Juveniles: " : null}
                          {index == 2 ? "Adultos: " : null}
                        </p>
                        <p>{array[0].toFixed(0)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            <ExplanationAmount
              data={[
                { type: "joven", value: lastSpecieVector.getValue(0, 0) },
                { type: "juvenil", value: lastSpecieVector.getValue(1, 0) },
                { type: "adulto", value: lastSpecieVector.getValue(2, 0) },
              ]}
              periods={especieVectorHistory?.length || 0}
            />
          </>
        ) : null}
      </Card>

      <Card className="flex flex-col p-3 gap-3">
        <h2 className="text-xl font-semibold">
          Calcular el vector con la distribución de la población a largo plazo
        </h2>
        <form className="flex gap-4 mt-4" action={calculatePredictionLong}>
          <input
            type="text"
            name="leslieMatrix"
            defaultValue={JSON.stringify(leslieMatrix)}
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
        {stationaryVector && stationaryVector?.length !== 0 ? (
          <>
            <Card className="flex flex-col p-3 gap-3">
              <div className="flex ">
                <div className="flex gap-4 items-center">
                  <h2 className="text-xl font-semibold">Vector Estacionario</h2>
                  <Vector
                    matrix={
                      new Matrix({
                        data: stationaryVector.map((value) => [value]),
                      })
                    }
                    rules={{ toFixed: 4 }}
                  />
                  <div className="flex flex-col gap-3">
                    {stationaryVector?.map((percentaje) => (
                      <div key={percentaje} className="flex gap-3">
                        <p>
                          {percentaje === stationaryVector[0]
                            ? "Jovenes: "
                            : null}
                          {percentaje === stationaryVector[1]
                            ? "Juveniles: "
                            : null}
                          {percentaje === stationaryVector[2]
                            ? "Adultos: "
                            : null}
                        </p>
                        <p>{(percentaje * 100).toFixed(2)}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            <ExplanationPercentaje
              data={[
                { type: "joven", value: stationaryVector[0] },
                { type: "juvenil", value: stationaryVector[1] },
                { type: "adulto", value: stationaryVector[2] },
              ]}
            />
          </>
        ) : null}
      </Card>
      {!!especieVectorHistory && especieVectorHistory?.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold">
            Historial de Población en n Periodos
          </h2>
          <div className="flex flex-col gap-4">
            {especieVectorHistory?.map((vector, i) => {
              return (
                <Card key={i} className="flex flex-col p-3 gap-3">
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
                        rules={{ toFixed: 4 }}
                      />
                      <span>=</span>
                      <Vector
                        matrix={i === 0 ? especieVectorHistory[0] : vector}
                        rules={{ toFixed: 4 }}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : null}
    </main>
  );
}
