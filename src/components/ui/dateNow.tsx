import React from "react";

const ClientDateNow = () => {
  const clientDate = new Date(Date.now());
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

export default ClientDateNow;
