import React from "react";
import s from "./SetionTitle.module.css";
export const SectionTitle = ({ children, className }) => {
  return (
    <p
      className={`${s.title} ${className ? className : ""}`}
    >{`/ ${children}`}</p>
  );
};
