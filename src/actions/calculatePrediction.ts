"use server";

import { vectorHistory } from "@/db/vectorHistory";
import { Matrix } from "@/domain/classes/matrix";
import { revalidatePath } from "next/cache";

const calculatePrediction = (formData: FormData) => {
  try {
    const periods = formData.get("periods");
    const id = formData.get("id");
    const initialPopulationMatrix = new Matrix(
      JSON.parse(formData.get("initialPopulation") as string)
    );
    const leslieMatrix = new Matrix(
      JSON.parse(formData.get("leslieMatrix") as string)
    );

    const result = leslieMatrix.iterateWithMatrixNTimes(
      initialPopulationMatrix,
      periods ? Number(periods) : 0
    );

    vectorHistory.map((especie) => {
      if (especie.id === Number(id)) {
        especie.history = [result];
      }
    });

    return;
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath("/especies/1");
  }
};

export default calculatePrediction;
