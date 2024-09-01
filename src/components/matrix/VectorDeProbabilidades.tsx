import React from "react";
import Matrix from "./Matrix";
import { TMatrixProps } from "@/domain/types/matrix";

const VectorDeProbabilidades: React.FC<TMatrixProps> = ({ matrix, rules }) => {
  return (
    <Matrix
      matrix={matrix}
      rules={{
        ...rules,
        isNonNegative: true,
      }}
    />
  );
};

export default VectorDeProbabilidades;
