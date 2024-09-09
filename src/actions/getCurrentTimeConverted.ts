"use server";

import { convertLocalToSystemTimeZone } from "@/helpers/convertToSystemTimezone";

export const getCurrentTimeConverted = async (): Promise<string | undefined> => {
  try {
    const now = new Date();
    const timeZoneDate = convertLocalToSystemTimeZone(now);

    if (timeZoneDate) {
      //return current date for system timezone defined in constants
      return timeZoneDate.toISOString();
    } else {
      console.error("Failed to fetch current time");
    }
  } catch (error) {
    console.error("Error during current time fetch", error);
    throw new Error("Error during current time fetch");
  }
};
