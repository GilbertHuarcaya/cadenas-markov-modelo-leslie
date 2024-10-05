"use server";

import { vectorHistory } from "@/db/vectorHistory";
import { Matrix } from "@/domain/classes/matrix";
import { revalidatePath } from "next/cache";

const calculateEstationaryHistorial = async (formData: FormData) => {
  const id = formData.get("id");
  try {
    const initialPopulationMatrix = new Matrix(
      JSON.parse(formData.get("initialPopulation") as string)
    );
    const leslieMatrix = new Matrix(
      JSON.parse(formData.get("leslieMatrix") as string)
    );
    //reset history
    vectorHistory.map((especie) => {
      if (especie.id === Number(id)) {
        especie.stationaryHistory = [];
      }
    });

    /* let result = new Matrix({ data: [[1], [1], [1]] }); */
    let result = initialPopulationMatrix;
    let normalized = initialPopulationMatrix.normalize(result.getData());

    for (let i = 0; i < 1000; i++) {
      result = leslieMatrix.multiply(normalized);

      normalized = leslieMatrix.normalize(result.getData());
      vectorHistory.map((especie) => {
        if (especie.id === Number(id)) {
          especie.stationaryHistory = [
            ...especie.stationaryHistory,
            normalized,
          ];
        }
      });
    }

    return;
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath(`/especies/${id}`);
  }
};

export default calculateEstationaryHistorial;
