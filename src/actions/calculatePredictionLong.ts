"use server";

import { vectorHistory } from "@/db/vectorHistory";
import { Matrix } from "@/domain/classes/matrix";
import { revalidatePath } from "next/cache";

const calculatePredictionLong = (formData: FormData) => {
  try {
    const id = formData.get("id");
    const leslieMatrix = new Matrix(
      JSON.parse(formData.get("leslieMatrix") as string)
    );

    const result = leslieMatrix.leslieEstacionario();

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

export default calculatePredictionLong;
