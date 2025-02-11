import React, { memo } from "react";
import s from "./SetionTitle.module.css";
export const SectionTitle = memo(({ children, className }) => {
  return (
    <p
      className={`${s.title} ${className ? className : ""}`}
    >{`/ ${children}`}</p>
  );
});
