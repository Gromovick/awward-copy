import React, { useEffect, useRef, useState } from "react";
import s from "./Hero.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { memo } from "react";
gsap.registerPlugin(CustomEase);
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
import { RedHero } from "../RedHero/RedHero";
import { TheLine } from "../TheLine/TheLine";
import { PreLoad } from "../PreLoad/PreLoad";
export const Hero = memo(() => {
  const container = useRef();

  useGSAP(
    () => {
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
    },
    { dependencies: [container.current] }
  );

  const [loaded, setIsLoaded] = useState(false);
  const [preload, setPreload] = useState(true);
  useEffect(() => {
    window.addEventListener("load", () => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <>
      <RedHero />
      <div className={s.heroWrapper}>
        <div className={s.redHeroWrapper}>
          <div className={s.redContent} ref={container}>
            {preload && <PreLoad isLoaded={loaded} setPreload={setPreload} />}
            <TheLine anim={loaded} needAnim={true} className={s.line} />
          </div>
        </div>
      </div>
    </>
  );
});
