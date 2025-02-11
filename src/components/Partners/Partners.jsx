import React, { memo, useContext } from "react";
import s from "./Partners.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeaderContext } from "../Header/HeaderProvider";
import { SectionTitle } from "../SectionTitle/SectionTitle";
const Partners = memo(() => {
  const { setCustomColor, clearCustomColor } = useContext(HeaderContext);

  const partners = [
    "Jopa",
    "Sisi",
    "Nvidia",
    "AMD",
    "Intel",
    "Ryzen",
    "Monte",
    "NaVi",
    "Porsche",
    "BMW",
    "WWW",
  ];

  useGSAP(
    () => {
      gsap.from(`.${s.partnerName}`, {
        opacity: 0,
        duration: 0.15,
        stagger: 0.1,
        scrollTrigger: {
          trigger: `.${s.scroller}`,
          start: "top bottom",
        },
      });
    },
    { dependencies: [] }
  );

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: `.${s.videoFrame}`,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onEnter() {
          setCustomColor("#fff");
        },
        onEnterBack() {
          setCustomColor("#fff");
        },
        onLeave() {
          setCustomColor("#000");
        },
        onLeaveBack() {
          setCustomColor("#000");
        },
      });
    },
    { dependencies: [] }
  );

  return (
    <div className={s.scroller}>
      <div className={s.wrapper}>
        <SectionTitle>Clients + Partners</SectionTitle>
        <div className={s.partners}>
          {partners.map((partner, index) => (
            <div className={s.partner} key={partner}>
              {index > 0 ? <span className={s.gap}>&nbsp;/&nbsp;</span> : ""}
              <span className={s.partnerName}>{partner} </span>
            </div>
          ))}
        </div>
        <div className={s.videoFrame}>
          <div className={s.red}>
            <div className={s.backRed}></div>
            <div className={s.topRed}>
              <span>showreel/2024</span>
              <span>1:26</span>
              <span>THE LINE@MMXXV</span>
            </div>
            <div className={s.mainRed}>
              <div className={s.box}></div>
              <span className={s.textMainRed}>Reel</span>
            </div>
          </div>
          <video className={s.video} src="/back/back.mp4" autoPlay muted loop />
        </div>
      </div>
    </div>
  );
});

export default Partners;
