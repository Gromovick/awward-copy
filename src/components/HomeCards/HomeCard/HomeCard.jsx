import React, { forwardRef } from "react";
import s from "./HomeCard.module.css";
export const HomeCard = forwardRef(({ children, wrapper, ...props }, ref) => {
  return (
    <div ref={(ref) => wrapper.current?.push(ref)} className={s.wrapper}>
      <div ref={ref} className={s.card}>
        {children}
      </div>
    </div>
  );
});
