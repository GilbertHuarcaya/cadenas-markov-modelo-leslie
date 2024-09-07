"use client";
import React, { useEffect, useState } from "react";
import DateNow from "./dateNow";
import ClientDate from "./date";
import moment from "moment";

const DateState = () => {
  const [dateState, setDateState] = useState<Date>();
  const [dateMoment, setDateMoment] = useState<Date>();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateState(
        new Date(
          new Date().toLocaleString("es", { timeZone: "America/Bogota" })
        )
      );
    }, 1000);

    const interval2 = setInterval(() => {
      setDateMoment(moment.utc(new Date(Date.now())).toDate());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <p>{JSON.stringify(dateState)}</p>
      {dateState ? (
        <>
          <p>{dateState?.toString()}</p>
          <p>{dateState?.toLocaleString()}</p>
        </>
      ) : (
        <>No hay fecha</>
      )}
      <h2>Moment</h2>
      <p>{JSON.stringify(dateMoment)}</p>
      {dateState ? (
        <>
          <p>{dateMoment?.toString()}</p>
          <p>{dateMoment?.toLocaleString()}</p>
        </>
      ) : (
        <>No hay fecha</>
      )}
      <button
        className="bg-black text-white"
        onClick={() =>
          setDateState(
            new Date(
              new Date().toLocaleString("es", { timeZone: "America/Bogota" })
            )
          )
        }>
        Set Date
      </button>
      <button
        className="bg-black text-white"
        onClick={() => setDateState(new Date(Date.now()))}>
        Set Date Now
      </button>

      <button
        className="bg-black text-white"
        onClick={() => moment.utc(new Date(Date.now())).toDate()}>
        Set Date Now
      </button>
      <h2>Client Date moment</h2>
      <ClientDate />
      <h2>Client Date Now</h2>
      <DateNow />
    </div>
  );
};

export default DateState;
