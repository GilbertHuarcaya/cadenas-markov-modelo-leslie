"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Matrix } from "@/domain/classes/matrix";
import { TMatrixProps } from "@/domain/types/matrix";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

const UIMatrix: React.FC<TMatrixProps> = ({ matrix, rules }) => {
  const [editableMatrix, setEditableMatrix] = useState<Matrix | undefined>();
  const [matrixData, setMatrixData] = useState<number[][]>();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (matrix) {
      if (rules?.isSquare && matrix?.getRows() !== matrix?.getCols()) {
        return;
      }
      setEditableMatrix(matrix);
      setMatrixData(matrix.getData());
      return;
    }
  }, [matrix, rules?.isSquare]);

  return (
    <section
      className="flex border-x-2 border-black rounded-lg"
      onMouseEnter={() => setIsEditable(true)}
      onMouseLeave={() => !isFocused && setIsEditable(false)}>
      {/* <span>[</span> */}
      <Table>
        <TableBody>
          {matrixData?.map((row, i) => (
            <TableRow key={i}>
              {row.map((col, j) => (
                <TableCell key={j}>
                  {rules?.isEditable && isEditable ? (
                    <Input
                      value={rules?.toFixed ? col.toFixed(rules?.toFixed) : col}
                      onFocusCapture={() => setIsFocused(true)}
                      onBlur={() => {
                        setIsFocused(false);
                      }}
                      type="number"
                      className=" p-1 h-6 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      size={1}
                      min={rules?.isNonNegative ? 0 : undefined}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const updatedMatrix = [...matrixData];
                        let newValue = rules?.isInteger
                          ? Math.floor(Number(e.target.value))
                          : Number(e.target.value);

                        // updateUI
                        updatedMatrix[i][j] = newValue;
                        setMatrixData(updatedMatrix);
                        // updateMatrix
                        editableMatrix?.setValue(i, j, newValue);
                      }}
                    />
                  ) : (
                    <span>
                      {rules?.toFixed && col % 1 != 0
                        ? col.toFixed(rules?.toFixed)
                        : col}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <span>]</span> */}
    </section>
  );
};

export default UIMatrix;
