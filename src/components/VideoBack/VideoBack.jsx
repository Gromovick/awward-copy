import React from "react";
import s from "./VideoBack.module.css";
export const VideoBack = () => {
  return (
    <div className={s.backWrapper}>
      <video className={s.back} src="/back/back.mp4" muted autoPlay loop/>
    </div>
  );
};
