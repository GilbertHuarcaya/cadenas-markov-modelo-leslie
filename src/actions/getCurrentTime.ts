"use server";

import { convertToSystemTimezone } from "@/helpers/convertToSystemTimezone";

export const getCurrentTime = async (): Promise<string | undefined> => {
  try {
		const now = new Date();
    const timeZoneDate = convertToSystemTimezone(now);

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
