import LeslieMatrix from "@/components/matrix/LeslieMatrix";
import Vector from "@/components/matrix/Vector";
import { Card } from "@/components/ui/card";
import { Matrix } from "@/domain/classes/matrix";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import HistoryButton from "./HistoryButton";

const History = async ({
  leslieMatrix,
  initialPopulationMatrix,
  especieVectorHistory,
  especieStationaryHistory,
}: {
  leslieMatrix: Matrix;
  initialPopulationMatrix: Matrix;
  especieVectorHistory?: Matrix[] | undefined;
  especieStationaryHistory?: Matrix[] | undefined;
}) => {
  return (
    <Dialog>
      <HistoryButton
        className="button-primary"
        disabled={
          (!especieVectorHistory ||
            (!!especieVectorHistory && especieVectorHistory?.length == 0)) &&
          (!especieStationaryHistory ||
            (!!especieStationaryHistory &&
              especieStationaryHistory?.length == 0))
        }
      />

      <DialogContent className=" overflow-auto max-h-dvh">
        <Card className="flex flex-col p-3 gap-3">
          {!!especieVectorHistory && especieVectorHistory?.length > 0 ? (
            <div className="flex flex-col">
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
            </div>
          ) : null}
          {!!especieStationaryHistory &&
          especieStationaryHistory?.length > 0 ? (
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">
                Historial de Población a largo plazo
              </h2>
              <div className="flex flex-col gap-4">
                {especieStationaryHistory?.map((vector, i) => {
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
                                ? initialPopulationMatrix.normalize(
                                    initialPopulationMatrix.getData()
                                  )
                                : especieStationaryHistory[i - 1]
                            }
                            rules={{ toFixed: 4 }}
                          />
                          <span>=</span>
                          <Vector
                            matrix={
                              i === 0 ? especieStationaryHistory[0] : vector
                            }
                            rules={{ toFixed: 4 }}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : null}
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default History;
