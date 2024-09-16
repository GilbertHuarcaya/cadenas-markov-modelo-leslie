import { Matrix } from "@/domain/classes/matrix";
import { TMatrixRules } from "@/domain/types/matrix";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

const ServerMatrix: React.FC<{ matrix: Matrix; rules: TMatrixRules }> = ({
  matrix,
  rules,
}) => {
  return (
    <section className="flex border-x-2 border-black rounded-lg">
      {/* <span>[</span> */}
      <Table>
        <TableBody>
          {matrix.getData()?.map((row, i) => (
            <TableRow key={i}>
              {row.map((col, j) => (
                <TableCell key={j}>
                  {rules?.isEditable ? null : (
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

export default ServerMatrix;
