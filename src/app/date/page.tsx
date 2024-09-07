import ClientDate from "@/components/ui/date";
import DateNow from "@/components/ui/dateNow";
import DateState from "@/components/ui/dateState";
import React from "react";

const DatePage = () => {
  const serverDate = new Date();
  const dateString = serverDate.toString();
  const localeString = serverDate.toLocaleString();

  return (
    <div className="flex flex-col gap-2 w-full justify-center items-center">
      <div className="flex flex-col">
        <p>{JSON.stringify(serverDate)}</p>
        <p>{dateString}</p>
        <p>{localeString}</p>
      </div>
      <h2>Server Date</h2>
      <ClientDate />
      <h2>Server Date Now</h2>
      <DateNow />

      <h1>Client Dates</h1>
      <DateState />
    </div>
  );
};

export default DatePage;
