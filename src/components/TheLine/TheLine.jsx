import React, { useEffect, useRef, useState } from "react";
import s from "./TheLine.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const TheLine = ({ className, color, anim, needAnim = undefined }) => {
  const tlRef = useRef();
  const test = useRef(false);
  const title = useRef();
  const line = useRef();

  function testFunc() {
    test.current = true;
  }

  useGSAP(
    () => {
      if (!needAnim || needAnim === undefined) {
        return;
      }
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        line.current,
        {
          width: "0%",
        },
        { width: "100%", duration: 0.35 }
      )
        .to(line.current, {
          height: "100%",
          top: 0,
          duration: 0.35,
        })
        .fromTo(
          title.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.35,
          }
        )
        .to(line.current, {
          height: "12%",
          top: "47.5%",
          duration: 0.35,
          onComplete: () => {
            testFunc();
            console.log("COMPLETED");
          },
        });

      tlRef.current = tl;
    },
    { dependencies: [needAnim, line.current, title.current] }
  );

  useEffect(() => {
    if (anim && tlRef.current) {
      tlRef.current?.play();
    }
  }, [anim, tlRef.current]);

  return (
    <div
      style={{ "--color": color ? color : "#fff" }}
      className={`${s.contentWrapper} ${className ? className : ""}`}
    >
      <div className={s.line} ref={line}></div>
      <h1 className={s.content} ref={title}>
        THE L1NE
      </h1>
      {test.current ? (
        <h1 style={{ color: "green", position: "relative", zIndex: "10000" }}>
          TEST
        </h1>
      ) : null}
    </div>
  );
};
