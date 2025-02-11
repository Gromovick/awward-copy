import React, { memo } from "react";
import s from "./VideoBack.module.css";
export const VideoBack = memo(() => {
  return (
    <div className={s.backWrapper}>
      <video className={s.back} src="/back/back (2).mp4" muted autoPlay loop />
    </div>
  );
});
