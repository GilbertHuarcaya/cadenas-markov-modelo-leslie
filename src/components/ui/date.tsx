import React from "react";

const ClientDate = () => {
  const clientDate = new Date(
    new Date().toLocaleString("es", { timeZone: "America/Bogota" })
  );
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
