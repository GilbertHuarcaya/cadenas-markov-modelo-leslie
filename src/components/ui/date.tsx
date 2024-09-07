import React from "react";
import moment from "moment";

const ClientDate = () => {
  const clientDate = moment.utc().toDate();
  const dateString = clientDate.toString();
  const localeString = clientDate.toLocaleString();

  return (
    <div className="flex flex-col">
      <p>{JSON.stringify(clientDate)}</p>
      <p>{dateString}</p>
      <p>{localeString}</p>
    </div>
  );
};

export default ClientDate;
