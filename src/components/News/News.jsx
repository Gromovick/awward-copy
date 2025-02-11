import React, { memo, useRef } from "react";
import s from "./News.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const News = memo(() => {
  const cardsRef = useRef([]);

  useGSAP(
    () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        let textParts = card.querySelectorAll(`.${s.cardTextPart}`);

        // gsap.set(textParts, { opacity: 0 });

        let exitTime = 0;

        const tl = gsap
          .timeline({ paused: true })
          .fromTo(
            textParts,
            { opacity: 0, y: "30px" },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.5,
            }
          )
          .addPause("exit");
        exitTime = tl.duration();
        tl.to(textParts, {
          opacity: 0,
          duration: 0.3,
        });

        card.addEventListener("mouseenter", () => {
          if (tl.time() < exitTime) {
            tl.play();
          } else {
            tl.restart();
          }
        });

        card.addEventListener("mouseleave", () => {
          if (tl.time() < exitTime) {
            tl.reverse();
          } else {
            tl.play();
          }
        });
      });
    },
    { dependencies: [] }
  );

  return (
    <div className={s.wrapper}>
      <SectionTitle>From the studio</SectionTitle>
      <h1 className={s.title}>News</h1>
      <div className={s.cards}>
        {["/news/1.avif", "/news/2.avif"].map((imgSrc, index) => (
          <div
            key={index}
            className={s.card}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <img src={imgSrc} alt="" className={s.cardImg} loading="lazy" />
            <div className={s.cardContent}>
              <p className={s.cardDate}>/29/11/2024 </p>
              <div className={s.cardTitle}>The Vault</div>
              <div className={s.cardTextWrapper}>
                {[
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                  "Necessitatibus a ullam adipisci? Adipisci, porro!",
                  "Exercitationem dicta animi nobis sunt voluptatem perspiciatis voluptates beatae adipisci nostrum.",
                  "Exercitationem eveniet asperiores quo minima.",
                ]
                  .reverse()
                  .map((text, i) => (
                    <p key={i} className={s.cardTextPart}>
                      {text}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default News;
