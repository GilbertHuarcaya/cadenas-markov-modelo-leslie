import { Matrix } from "../classes/matrix";

export type TMatrix = Matrix;
export type TMatrixSize = { columnas: number; filas: number };
/**
 * Represents the rules that define a matrix.
 *
 * @remarks
 * A matrix can have various properties that determine its behavior and characteristics.
 * The `TMatrixRules` type defines these properties as boolean values.
 *
 * - `isStochastic`: Indicates whether the matrix is stochastic.
 * - `isSquare`: Indicates whether the matrix is square.
 * - `isPositive`: Indicates whether all elements of the matrix are positive.
 * - `isInteger`: Indicates whether all elements of the matrix are integers.
 * - `isNonNegative`: Indicates whether all elements of the matrix are non-negative.
 */
export type TMatrixRules = {
  isStochastic?: boolean;
  isSquare?: boolean;
  isPositive?: boolean;
  isInteger?: boolean;
  isNonNegative?: boolean;
  isEditable?: boolean;
  toFixed?: number
};
export type TMatrixProps = {
  matrix?: TMatrix;
  rules?: TMatrixRules;
};

export type TLeslieMatrixProps = {
  matrix: TMatrix;
  rules?: TMatrixRules;
  header?: string[];
  firstCol?: string[];
};
