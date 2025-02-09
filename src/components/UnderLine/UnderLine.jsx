import React, { useRef } from "react";
import s from "./UnderLine.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const UnderLine = ({ children, className, color }) => {
  return (
    <div
      style={{ "--color": color ? color : "#fff" }}
      className={`${className} ${s.underLine} `}
    >
      {children}
    </div>
  );
};
export const UnderLineWithArrows = ({
  className,
  color,
  text,
  full,
  visible,
  children,
}) => {
  const wrapperRef = useRef();
  const lettersRef = useRef([]);

  useGSAP(() => {
    if (!wrapperRef.current) return;

    // gsap.set(`.${s.letter}`, { opacity: 1 });

    // Define timeline for animation but keep it paused initially
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      `.${s.letter}`,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.075 / 2,
        stagger: 0.05 / 2,
        delay: 0.1 / 2,
      }
    ).to(`.${s.letter}`, {
      opacity: 1,
      duration: 0 / 2,
      stagger: 0.05 / 2,
      delay: 0.1 / 2,
    });

    const playAnimation = () => {
      tl.restart();
    };

    wrapperRef.current.addEventListener("mouseenter", playAnimation);
    wrapperRef.current.addEventListener("mouseleave", playAnimation);

    return () => {
      wrapperRef.current.removeEventListener("mouseenter", playAnimation);
      wrapperRef.current.removeEventListener("mouseleave", playAnimation);
    };
  }, []);

  return (
    <div
      style={{ "--color": color || "#fff" }}
      className={`${s.wrapper} ${full ? s.full : ""} ${
        visible ? s.visible : ""
      }`}
      ref={wrapperRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={s.arrow}
        id={s.left}
        viewBox="0 -960 960 960"
      >
        <path d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z" />
      </svg>
      <div className={`${className} ${s.underLine} ${s.withArrows}`}>
        {text
          ? text?.split("").map((e, i) => (
              <span
                key={i}
                ref={(el) => (lettersRef.current[i] = el)}
                className={s.letter}
              >
                {e == " " ? ` ` : e}
              </span>
            ))
          : children}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={s.arrow}
        viewBox="0 -960 960 960"
        id={s.right}
      >
        <path d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z" />
      </svg>
    </div>
  );
};
