import { DATES } from "@/domain/constants/components";
import {
  convertLocalToSystemTimeZone,
  convertToDateWithoutTimezone,
  convertToSystemTimezone,
} from "@/helpers/convertToSystemTimezone";
import React from "react";

const ClientDateNow = () => {
  const now = new Date();

  return (
    <div className="flex flex-col">
      <h2>converted timezone</h2>
      <p>{convertToSystemTimezone(now).toISOString()}</p>
      <p>
        {convertToSystemTimezone(now).toLocaleString(DATES.localeDateString)}
      </p>
      <h2>no timezone</h2>
      <p>{convertToDateWithoutTimezone(now)}</p>
      <h2>Local to System</h2>
      <p>{convertLocalToSystemTimeZone(now).toISOString()}</p>
      <p>
        {convertLocalToSystemTimeZone(now).toLocaleString(
          DATES.localeDateString
        )}
      </p>
    </div>
  );
};

export default ClientDateNow;
