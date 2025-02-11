import React, { useRef, useEffect, memo } from "react";
import s from "./RedHero.module.css";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const RedHero = memo(() => {
  const container = useRef();

  useEffect(() => {
    if (container.current) {
      gsap.fromTo(
        container.current,
        {
          rotation: 0,
          x: 0,
        },
        {
          rotation: -10,
          x: "-10%",
          transformOrigin: "0% 100%",
          ease: CustomEase.create(
            "custom",
            "M0,0 C0,0 0.344,0.037 0.344,0.037 0.344,0.037 0.482,0.121 0.516,0.145 0.549,0.169 0.633,0.212 0.663,0.241 0.695,0.273 0.755,0.36 0.783,0.397 0.81,0.434 0.851,0.537 0.875,0.578 0.9,0.624 0.946,0.723 0.968,0.772 0.991,0.825 1,1 1,1 "
          ),
          scrollTrigger: {
            trigger: container.current, // Element that triggers the animation
            start: "top top", // When the top of the element hits the center of the viewport
            end: "bottom top", // When the bottom of the element hits the top of the viewport
            scrub: true, // Smooth animation synced with scrolling
            // markers: true,
          },
        }
      );
    }
  }, [container.current]);

  return <div className={s.redWrapper} ref={container}></div>;
});
