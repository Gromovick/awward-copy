import React from "react";
import s from "./About.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { memo } from "react";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
const About = memo(() => {
  useGSAP(
    () => {
      gsap.from(`.${s.images} img`, {
        x: "-40%",
        y: "20%",
        rotation: 5,
        scrollTrigger: {
          trigger: `.${s.content}`,
          start: "top bottom",
          end: "center center",
          scrub: true,
          // markers: true,
        },
      });
    },
    { dependencies: [] }
  );
  useGSAP(
    () => {
      gsap.from(`.${s.wrapper}`, {
        x: "-20%",
        y: "20%",
        rotation: 16,
        scrollTrigger: {
          trigger: `.${s.scroller}`,
          start: "top bottom",
          end: "top center",
          scrub: true,
          // markers: true,
        },
      });
    },
    { dependencies: [] }
  );

  return (
    <div className={s.scroller}>
      <div className={s.wrapper}>
        <SectionTitle>Make your mark</SectionTitle>
        <h1 className={s.title}>The Studio</h1>

        <div className={s.content}>
          <div className={s.images}>
            <img className={s.real} src="/about/1.avif " alt="" />
            <img className={s.back} src="/about/2.avif " alt="" />
          </div>
          <div className={s.textWrapper}>
            <SectionTitle>The lowdown</SectionTitle>

            <p className={s.text}>
              We’re a globally renowned animation studio based in East LDN. We
              work across advertising interactive media, music videos and our
              own original content.
            </p>
            <SectionTitle>Awards & Mentions</SectionTitle>
            <div className={s.lists}>
              <ul className={s.awards}>
                <li className={s.item}>BAFTA</li>
                <li className={s.item}>AD YOUNG GUN AWARD</li>
                <li className={s.item}>BRITISH ANIMATION AWARDS</li>
                <li className={s.item}>ANNECY</li>
                <li className={s.item}>CLIO</li>
                <li className={s.item}>BRITISH ARROWS</li>
                <li className={s.item}>LONDON MUSIC VIDEO AWARDS</li>
                <li className={s.item}>D&AD</li>
              </ul>
              <ul className={s.clients}>
                <li className={s.item}>GQ</li>
                <li className={s.item}>NME</li>
                <li className={s.item}>THE VERGE</li>
                <li className={s.item}>VARIETY</li>
                <li className={s.item}>THE HOLLYWOOD REPORTER</li>
                <li className={s.item}>THE LOS ANGELES TIMES</li>
                <li className={s.item}>THE TONIGHT SHOW WITH JIMMY FALLON</li>
                <li className={s.item}>BBC</li>
                <li className={s.item}>WIRED MAGAZINE</li>
                <li className={s.item}>THE INDEPENDENT</li>
                <li className={s.item}>THE SUNDAY TIMES</li>
                <li className={s.item}>ROLLING STONE</li>
                <li className={s.item}>THE TELEGRAPH</li>
                <li className={s.item}>PLAYBOY</li>
                <li className={s.item}>COSMOPOLITAN</li>
                <li className={s.item}>E ONLINE</li>
                <li className={s.item}>NERDIST</li>
                <li className={s.item}>NBC NEWS</li>
                <li className={s.item}>POLYGON</li>
                <li className={s.item}>HYPEBEAST</li>
              </ul>
            </div>
            <div className={s.phraseWrapper}>
              <h3 className={s.phrase}>“BELLISSIMO”</h3>
              <p className={s.phraseAuthor}>– GUILLERMO DEL TORO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default About;
