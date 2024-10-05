import calculatePredictionHistorial from "@/actions/calculatePredictionHistorial";
import ExplanationAmount from "@/components/explanation/ExplanationAmount";
import Vector from "@/components/matrix/Vector";
import { Card } from "@/components/ui/card";
import { Matrix } from "@/domain/classes/matrix";
import React, { Suspense } from "react";
import History from "@/components/species/sections/History";
import { vectorHistory } from "@/db/vectorHistory";

const ShortPeriod = ({
  especie,
  leslieMatrix,
  initialPopulationMatrix,
}: {
  especie: TEspecie;
  leslieMatrix: Matrix;
  initialPopulationMatrix: Matrix;
}) => {
  //Obtener el historial de la especie
  const especieVectorHistory = vectorHistory.find(
    (e) => e.id === especie.id
  )?.history;
  const lastSpecieVector = especieVectorHistory?.at(-1);

  return (
    <section className="flex flex-col items-center gap-3">
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
            defaultValue={especie.id}
            className="p-2 border border-gray-300 rounded-lg"
            hidden
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg">
            Calcular
          </button>
        </form>
        {lastSpecieVector && lastSpecieVector !== undefined ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : null}
        <Suspense fallback={<div>Loading...</div>}>
          <History
            {...{
              leslieMatrix,
              initialPopulationMatrix,
              especieVectorHistory,
            }}
          />
        </Suspense>
      </Card>
    </section>
  );
};

export default ShortPeriod;
