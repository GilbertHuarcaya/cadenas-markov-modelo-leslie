import calculateEstationaryHistorial from "@/actions/calculateEstationaryHistorial";
import calculatePredictionLong from "@/actions/calculatePredictionLong";
import ExplanationAmount from "@/components/explanation/ExplanationAmount";
import ExplanationPercentaje from "@/components/explanation/ExplanationPercentage";
import Vector from "@/components/matrix/Vector";
import { Card } from "@/components/ui/card";
import { Matrix } from "@/domain/classes/matrix";
import React, { Suspense } from "react";
import History from "@/components/species/sections/History";
import { vectorHistory } from "@/db/vectorHistory";

const LongPeriod = async ({
  especie,
  leslieMatrix,
  initialPopulationMatrix,
}: {
  especie: TEspecie;
  leslieMatrix: Matrix;
  initialPopulationMatrix: Matrix;
  }) => {
  //Obtener el historial estacionario de la especie
  const especieStationaryHistory = vectorHistory.find(
    (e) => e.id === especie.id
  )?.stationaryHistory;
  const lastSpecieStationary = especieStationaryHistory?.at(-1);

  return (
    <section className="flex flex-col items-center gap-3">
      {/* <Card className="flex flex-col p-3 gap-3">
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
            defaultValue={especie.id}
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
      </Card> */}
      <Card className="flex flex-col p-3 gap-3">
        <h2 className="text-xl font-semibold">
          Calcular el vector con la distribución de la población a largo plazo
        </h2>
        <form
          className="flex gap-4 mt-4"
          action={calculateEstationaryHistorial}>
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
            defaultValue={especie.id}
            className="p-2 border border-gray-300 rounded-lg"
            hidden
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg">
            Calcular
          </button>
        </form>
        {lastSpecieStationary && lastSpecieStationary !== undefined ? (
          <>
            <Card className="flex flex-col p-3 gap-3">
              <div className="flex ">
                <div className="flex gap-4 items-center">
                  <h2 className="text-xl font-semibold">Vector Estacionario</h2>
                  <Vector
                    matrix={lastSpecieStationary}
                    rules={{ toFixed: 4 }}
                  />
                  <div className="flex flex-col gap-3">
                    {lastSpecieStationary?.getData()?.map((array, index) => (
                      <div key={index} className="flex gap-3">
                        <p>
                          {index == 0 ? "Jovenes: " : null}
                          {index == 1 ? "Juveniles: " : null}
                          {index == 2 ? "Adultos: " : null}
                        </p>
                        <p>{(array[0] * 100).toFixed(2)}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            <ExplanationPercentaje
              data={[
                { type: "joven", value: lastSpecieStationary.getValue(0, 0) },
                {
                  type: "juvenil",
                  value: lastSpecieStationary.getValue(1, 0),
                },
                {
                  type: "adulto",
                  value: lastSpecieStationary.getValue(2, 0),
                },
              ]}
            />
          </>
        ) : null}
        <Suspense fallback={<div>Loading...</div>}>
          <History
            {...{
              leslieMatrix,
              initialPopulationMatrix,
              especieStationaryHistory,
            }}
          />
        </Suspense>
      </Card>
    </section>
  );
};

export default LongPeriod;
