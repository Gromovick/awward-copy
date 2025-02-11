import React, { useEffect, useRef } from "react";
import s from "./TheLine.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const TheLine = ({ className, color, anim, needAnim }) => {
  const tlRef = useRef();

  useGSAP(() => {
    if (!needAnim || needAnim === undefined) {
      return;
    }
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      `.${s.line}`,
      {
        width: "0%",
      },
      { width: "100%", duration: 0.35 }
    )
      .to(`.${s.line}`, {
        height: "100%",
        top: 0,
        duration: 0.35,
      })
      .fromTo(
        `.${s.content}`,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
        }
      )
      .to(`.${s.line}`, {
        height: "12%",
        top: "47.5%",
        duration: 0.35,
      });

    tlRef.current = tl;
  });

  useEffect(() => {
    if (anim) {
      tlRef.current?.play();
    }
  }, [anim]);

  return (
    <div
      style={{ "--color": color ? color : "#fff" }}
      className={`${s.contentWrapper} ${className ? className : ""}`}
    >
      <div className={s.line}></div>
      <h1 className={s.content}>THE L1NE</h1>
    </div>
  );
};
