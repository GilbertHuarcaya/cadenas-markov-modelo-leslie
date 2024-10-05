import ServerMatrix from "@/components/matrix/ServerMatrix";
import Vector from "@/components/matrix/Vector";
import { Matrix } from "@/domain/classes/matrix";
import React from "react";

const Tables = ({
  leslieMatrix,
  initialPopulationMatrix,
}: {
  leslieMatrix: Matrix;
  initialPopulationMatrix: Matrix;
}) => {
  return (
    <section className="flex flex-col items-center gap-3">
      <h2 className="text-xl font-semibold">Matriz de Leslie</h2>
      <ServerMatrix matrix={leslieMatrix} rules={{ isEditable: false }} />
      <h2 className="text-xl font-semibold">Vector de Población Actual</h2>
      <Vector matrix={initialPopulationMatrix} />
    </section>
  );
};

export default Tables;
