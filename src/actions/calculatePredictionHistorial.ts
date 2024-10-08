"use server";

import { vectorHistory } from "@/db/vectorHistory";
import { Matrix } from "@/domain/classes/matrix";
import { revalidatePath } from "next/cache";

const calculatePredictionHistorial = (formData: FormData) => {
  const periods = formData.get("periods");
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
        especie.history = [];
      }
    });

    let result = initialPopulationMatrix;
    for (let i = 0; i < Number(periods); i++) {
      result = leslieMatrix.multiply(result);
      vectorHistory.map((especie) => {
        if (especie.id === Number(id)) {
          especie.history = [...especie.history, result];
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

export default calculatePredictionHistorial;
