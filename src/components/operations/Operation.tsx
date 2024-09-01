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
  const matriz = new Matrix(4, 4);
  const vectorProb = new Matrix(4, 1, [[0.25], [0.25], [0.25], [0.25]]);
  const [years, setYears] = useState(1); // veces que se tiene que iterar
  const [matrices, setMatrices] = useState([matriz, vectorProb]);
  /*   const [matrixHistory, setMatrixHistory] = useState<Matrix[]>([]);
  const [vector, setVector] = useState(vectorProb); */

  const multiplyMatrixInArray = (matrices: Matrix[]) => {

    /* const result = matrices.reduce((acc, matrix) => {
      return acc.multiply(matrix);
    }); */

    const result = matrices[0].iterateWithMatrixNTimes(matrices[1], years);
    setResult(result);
  };

  return (
    <Card className="flex items-center gap-5 p-3">
      {matrices.map((matrix, i) => (
        <div key={i} className="flex items-center gap-5">
          {matrix.isStochastic() ? (
            <MatrizEstocastica matrix={matrix} rules={{ isEditable: true }} />
          ) : (
            <VectorDeProbabilidades
              matrix={matrix}
              rules={{ isEditable: true }}
            />
          )}
        </div>
      ))}
      <Input
        defaultValue={years}
        type="number"
        min={1}
        placeholder="Repetir N veces"
        onChange={(e) => setYears(Number(e.target.value))}
      />
      {<Button onClick={() => multiplyMatrixInArray(matrices)}>=</Button>}
      {result ? <Matriz matrix={result} rules={{ isEditable: false, toFixed: 2 }} /> : null}
    </Card>
  );
};

export default Operation;
