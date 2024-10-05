import { TMatrixProps } from "@/domain/types/matrix";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

const Vector: React.FC<TMatrixProps> = ({ matrix, rules }) => {
  return (
    <section className="flex border-x-2 border-black rounded-lg w-fit">
      {/* <span>[</span> */}
      <Table>
        <TableBody>
          {matrix?.getData()?.map((row, i) => (
            <TableRow key={i}>
              {row.map((col, j) => (
                <TableCell key={j}>
                  <span>
                    {rules?.toFixed && col % 1 != 0
                      ? col.toFixed(rules?.toFixed)
                      : col}
                  </span>
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

export default Vector;
