"use client"
import { TMatrixProps } from "@/domain/types/matrix";
import React from "react";
import Matrix from "./Matrix";

const MatrizEstocastica: React.FC<TMatrixProps> = ({ matrix, rules }) => {
  return (
    <Matrix
      matrix={matrix}
      rules={{
        ...rules,
        isStochastic: true,
        isSquare: true,
        isNonNegative: true,
      }}
    />
  );
};

export default MatrizEstocastica;
