import { TLeslieMatrixProps } from "@/domain/types/matrix";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const LeslieMatrix: React.FC<TLeslieMatrixProps> = ({
  matrix,
  rules,
  header,
  firstCol,
}) => {
  return (
    <section
      className={
        !header && !firstCol ? "flex border-x-2 border-black rounded-lg" : ""
      }>
      {/* <span>[</span> */}
      <Table>
        {header ? (
          <TableHeader>
            <TableRow>
              {header?.map((col, j) => (
                <TableHead key={j}>
                  <span>{col}</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        ) : null}
        <TableBody>
          {matrix?.getData().map((row, i) => (
            <TableRow key={i}>
              {firstCol ? (
                <TableCell>
                  <span>{firstCol[i]}</span>
                </TableCell>
              ) : null}
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

export default LeslieMatrix;
