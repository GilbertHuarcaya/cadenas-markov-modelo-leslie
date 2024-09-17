"use client";
import { Matrix } from "@/domain/classes/matrix";
import React, { useState } from "react";
import MatrizEstocastica from "../matrix/MatrizEstocastica";
import Matriz from "../matrix/Matrix";
import VectorDeProbabilidades from "../matrix/VectorDeProbabilidades";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

const Operation = () => {
  const [result, setResult] = useState<Matrix | undefined>();
  const matriz = new Matrix({ rows: 3, cols: 3 });
  const vectorProb = new Matrix({ rows: 3, cols: 1 });
  const [periods, setperiods] = useState(1);
  const [matrices, setMatrices] = useState([matriz, vectorProb]);

  const multiplyMatrixInArray = (matrices: Matrix[]) => {
    const result = matrices[0].iterateWithMatrixNTimes(matrices[1], periods);
    setResult(result);
  };

  return (
    <Card className="flex gap-5 p-3">
      {matrices.map((matrix, i) => (
        <div key={i} className="flex flex-col flex-grow justify-between gap-2">
          {matrix.isSquare() ? (
            <>
              <p className="text-center">Matriz de Leslie</p>
              <MatrizEstocastica matrix={matrix} rules={{ isEditable: true }} />
            </>
          ) : (
            <>
              <p className="text-center">Vector</p>
              <VectorDeProbabilidades
                matrix={matrix}
                rules={{ isEditable: true }}
              />
            </>
          )}
        </div>
      ))}
      <div className="flex flex-col flex-grow justify-between gap-2">
        <p className="text-center">Periodo(s)</p>
        <Input
          defaultValue={periods}
          type="number"
          min={1}
          placeholder="Repetir N veces"
          className="self-end"
          onChange={(e) => setperiods(Number(e.target.value))}
        />
      </div>
      {
        <Button
          className="self-end"
          onClick={() => multiplyMatrixInArray(matrices)}>
          =
        </Button>
      }
      {result ? (
        <div className="flex flex-col flex-grow justify-between gap-2">
          <p className="text-center">Vector resultante</p>
          <Matriz matrix={result} rules={{ isEditable: false, toFixed: 4 }} />
        </div>
      ) : null}
    </Card>
  );
};

export default Operation;
