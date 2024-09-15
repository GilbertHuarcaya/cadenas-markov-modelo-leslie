"use server";

import { convertToSystemTimezone } from "@/helpers/convertToSystemTimezone";

export const getCurrentTime = async (): Promise<string | undefined> => {
  try {
		const now = new Date();

    if (now) {
      //return current date for system timezone defined in constants
      return now.toISOString();
    } else {
      console.error("Failed to fetch current time");
    }
  } catch (error) {
    console.error("Error during current time fetch", error);
    throw new Error("Error during current time fetch");
  }
};
