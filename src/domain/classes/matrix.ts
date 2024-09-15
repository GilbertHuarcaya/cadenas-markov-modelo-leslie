import { abs, max, eigs } from "mathjs";
export class Matrix {
  private rows: number;
  private cols: number;
  private data: number[][];

  constructor({
    rows,
    cols,
    data,
  }: {
    rows?: number;
    cols?: number;
    data?: number[][];
  }) {
    this.rows = rows || data?.length || 0;
    this.cols = cols || data?.[0]?.length || 0;
    this.data = data || [];

    if (!data) {
      for (let i = 0; i < this.rows; i++) {
        this.data[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] = 0;
        }
      }
    }
  }

  getRows(): number {
    return this.rows;
  }

  getCols(): number {
    return this.cols;
  }

  getValue(row: number, col: number): number {
    return this.data[row][col];
  }

  getData(): number[][] {
    return this.data;
  }

  setValue(row: number, col: number, value: number): void {
    this.data[row][col] = value;
  }

  add(matrix: Matrix): Matrix {
    if (this.rows !== matrix.getRows() || this.cols !== matrix.getCols()) {
      throw new Error("Matrix dimensions must match");
    }

    const result = new Matrix({ rows: this.rows, cols: this.cols });

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.setValue(i, j, this.data[i][j] + matrix.getValue(i, j));
      }
    }

    return result;
  }

  multiply(matrix: Matrix): Matrix {
    if (this.cols !== matrix.getRows()) {
      throw new Error("Matrix dimensions must match");
    }

    const result = new Matrix({ rows: this.rows, cols: matrix.getCols() });

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < matrix.getCols(); j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[i][k] * matrix.getValue(k, j);
        }
        result.setValue(i, j, sum);
      }
    }

    return result;
  }

  iterateWithMatrixNTimes(matrix: Matrix, n: number): Matrix {
    if (this.cols !== matrix.getRows()) {
      throw new Error("Matrix dimensions must match for multiplication");
    }

    let result = matrix;

    for (let i = 0; i < n; i++) {
      result = this.multiply(result);
    }

    return result;
  }

  leslieEstacionario() {
    const { values, eigenvectors } = eigs(this.data);
    const maxIndex = max(max(abs(values)));
    let vectors = eigenvectors.map((row) => max(row.value));
    const vecDom = eigenvectors.find((row) => maxIndex === row.value);

    return new Matrix({ data: [] });
  }

  isNonNegativeAndColumnSumIsOne(): boolean {
    // Check for non-negative values and column sums
    for (let j = 0; j < this.cols; j++) {
      let columnSum = 0;
      for (let i = 0; i < this.rows; i++) {
        const value = this.data[i][j];
        if (value < 0) {
          return false;
        }
        columnSum += value;
      }
      if (columnSum !== 1) {
        return false;
      }
    }
    return true;
  }

  isSquare(): boolean {
    // Check if the matrix is square
    if (this.rows !== this.cols) {
      return false;
    }

    return true;
  }

  isStochastic(): boolean {
    return this.isSquare() && this.isNonNegativeAndColumnSumIsOne();
  }
}
