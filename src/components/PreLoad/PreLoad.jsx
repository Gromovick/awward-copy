import React, { useEffect, useRef, useState } from "react";
import s from "./PreLoad.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export const PreLoad = ({ isLoaded, setPreload }) => {
  const [fps, setFps] = useState(0);
  const timerRef = useRef();
  const tlRef = useRef();
  useEffect(() => {
    const timer = setInterval(() => {
      const randomInt = Math.floor(Math.random() * 2);
      if (fps < 24) {
        setFps((prev) => (prev += randomInt));
      }
    }, 50);
    timerRef.current = timer;
  }, []);

  useEffect(() => {
    // console.log(fps);

    if (fps > 13 && isLoaded) {
      clearInterval(timerRef.current);
      setFps(24);
      tlRef.current?.play();
    }
  }, [fps, tlRef.current]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      tl.to(`.${s.wrapper}`, {
        y: "-100%",
        duration: 1,
        delay: 1,
        onComplete() {
          // setPreload(false);
        },
      });
      tlRef.current = tl;
    },
    { dependencies: [] }
  );

  return (
    <div className={s.wrapper}>
      <div className={s.counterWrapper}>
        <div className={s.counter}>
          <span>{fps}</span>
          <span>/</span>
          <span>24</span>
        </div>
      </div>
      <p className={s.fps}>FPS</p>
    </div>
  );
};
