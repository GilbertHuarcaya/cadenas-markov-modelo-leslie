"use client";
import React from "react";
import { DialogTrigger } from "../../ui/dialog";
import { DialogTriggerProps } from "@radix-ui/react-dialog";

const HistoryButton = ({
  disabled,
  className,
}: {
  disabled: boolean;
  className?: DialogTriggerProps["className"];
}) => {
  return (
    <DialogTrigger className={className} disabled={disabled}>
      Mostrar Historial
    </DialogTrigger>
  );
};

export default HistoryButton;
