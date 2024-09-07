import moment from "moment";
import React from "react";

const ClientDateNow = () => {
  const newMoment = moment();
  const clientDate = newMoment.format();
  const newDate = new Date(clientDate);
  const dateString = newDate.toString();
  const localeString = newDate.toLocaleString();

  return (
    <div className="flex flex-col">
      <p>{JSON.stringify(newDate)}</p>
      <p>{dateString}</p>
      <p>{localeString}</p>
    </div>
  );
};

export default ClientDateNow;
