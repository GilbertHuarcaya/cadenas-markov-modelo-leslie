/**
 * Represents a mathematical matrix.
 */
export class Matrix {
  private rows: number;
  private cols: number;
  private data: number[][];

  /**
   * Creates an instance of Matrix.
   * @param rows - Number of rows in the matrix.
   * @param cols - Number of columns in the matrix.
   * @param data - 2D array representing the matrix data.
   */
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

  /**
   * Gets the number of rows in the matrix.
   * @returns The number of rows.
   */
  getRows(): number {
    return this.rows;
  }

  /**
   * Gets the number of columns in the matrix.
   * @returns The number of columns.
   */
  getCols(): number {
    return this.cols;
  }

  /**
   * Gets the value at a specific row and column.
   * @param row - The row index.
   * @param col - The column index.
   * @returns The value at the specified row and column.
   */
  getValue(row: number, col: number): number {
    return this.data[row][col];
  }

  /**
   * Gets the entire matrix data.
   * @returns The 2D array representing the matrix data.
   */
  getData(): number[][] {
    return this.data;
  }

  /**
   * Sets the value at a specific row and column.
   * @param row - The row index.
   * @param col - The column index.
   * @param value - The value to set.
   */
  setValue(row: number, col: number, value: number): void {
    this.data[row][col] = value;
  }

  /**
   * Checks if all values in the matrix are non-negative and if each column sums to 1.
   * @returns True if all values are non-negative and each column sums to 1, otherwise false.
   */
  isNonNegativeAndColumnSumIsOne(): boolean {
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

  /**
   * Checks if the matrix is square (number of rows equals number of columns).
   * @returns True if the matrix is square, otherwise false.
   */
  isSquare(): boolean {
    return this.rows === this.cols;
  }

  /**
   * Checks if the matrix is stochastic (square, non-negative values, and columns sum to 1).
   * @returns True if the matrix is stochastic, otherwise false.
   */
  isStochastic(): boolean {
    return this.isSquare() && this.isNonNegativeAndColumnSumIsOne();
  }

  /**
   * Multiplies the current matrix with another matrix.
   * @param matrix - The matrix to multiply with.
   * @returns A new matrix that is the result of the multiplication.
   * @throws Error if the matrix dimensions do not match for multiplication.
   */
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

  /**
   * Iterates the current matrix with another matrix n times.
   * @param matrix - The matrix to iterate with.
   * @param n - The number of iterations.
   * @returns A new matrix that is the result of the iterations.
   * @throws Error if the matrix dimensions do not match for multiplication.
   */
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

  /**
   * Multiplica la matriz actual con un vector.
   * @param vec - El vector con el que se va a multiplicar.
   * @returns Un nuevo vector que es el resultado de la multiplicación.
   */
  multiplyVector(vec: number[]): number[] {
    let result = Array(this.rows).fill(0);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result[i] += this.data[i][j] * vec[j];
      }
    }
    return result;
  }

  /**
   * Normaliza un vector para que la suma de sus elementos sea igual a 1.
   * @param vec - El vector a normalizar.
   * @returns Un nuevo vector que está normalizado.
   */
  normalizeVector(vec: number[]): number[] {
    const sum = vec.reduce((acc, val) => acc + val, 0);
    return vec.map((val) => val / sum);
  }

  /**
   * Normaliza un vector o una matriz para que la suma de sus elementos sea igual a 1.
   * @param input - El vector o matriz a normalizar.
   * @returns Un nuevo vector o matriz que está normalizado.
   */
  normalize(input: number[] | number[][]): Matrix {
    if (Array.isArray(input[0])) {
      // Si es una matriz (array bidimensional)
      const matrix = input as number[][];
      const rows = matrix.length;
      const cols = matrix[0].length;
      const normalizedData = Array.from({ length: rows }, () =>
        Array(cols).fill(0)
      );

      for (let j = 0; j < cols; j++) {
        let colSum = 0;
        for (let i = 0; i < rows; i++) {
          colSum += matrix[i][j];
        }
        for (let i = 0; i < rows; i++) {
          const result = matrix[i][j] / colSum;
          normalizedData[i][j] = result;
        }
      }

      return new Matrix({ data: normalizedData });
    } else {
      // Si es un vector (array unidimensional)
      const vec = input as number[];
      const sum = vec.reduce((acc, val) => acc + val, 0);
      const normalizedVec = vec.map((val) => {
        const result = val / sum;
        return result;
      });
      return new Matrix({ data: [normalizedVec] });
    }
  }
  /**
   * Realiza el método de iteración de potencia para encontrar el vector propio dominante.
   * @param maxIterations - El número máximo de iteraciones (por defecto es 1000).
   * @param tolerance - La tolerancia para la convergencia (por defecto es 1e-10).
   * @returns El vector propio dominante.
   */
  powerIteration(maxIterations = 1000, tolerance = 1e-10): number[] {
    //maxIterations = 1000 es el número máximo de iteraciones que se realizarán para encontrar el vector propio dominante.
    //1e-10 es una notación científica que representa el número (1 \times 10^{-10}). En otras palabras, es un número muy pequeño, equivalente a 0.0000000001.
    // Inicializa el vector con todos los elementos en 1
    let vec = Array(this.rows).fill(1); // [ 1, 1, 1 ]
    // Inicializa el vector previo con todos los elementos en 0
    let prevVec = Array(this.rows).fill(0); // [ 0, 0, 0 ]

    // Itera hasta el número máximo de iteraciones
    for (let iter = 0; iter < maxIterations; iter++) {
      // Copia el vector actual al vector previo
      prevVec = vec.slice();
      // Multiplica la matriz actual con el vector
      vec = this.multiplyVector(vec);
      // Normaliza el vector resultante
      vec = this.normalizeVector(vec);

      // Calcula la diferencia entre el vector actual y el vector previo
      let diff = vec
        .map((v, i) => Math.abs(v - prevVec[i]))
        .reduce((a, b) => a + b, 0);

      // Si la diferencia es menor que la tolerancia, se considera que ha convergido
      if (diff < tolerance) {
        break;
      }
    }

    // Devuelve el vector propio dominante
    return vec;
  }
}
