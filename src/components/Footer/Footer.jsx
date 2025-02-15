import React, { memo, useEffect, useRef, useState } from "react";
import s from "./Footer.module.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { UnderLine, UnderLineWithArrows } from "../UnderLine/UnderLine";
import { TheLine } from "../TheLine/TheLine";
import { SectionTitle } from "../SectionTitle/SectionTitle";
gsap.registerPlugin(ScrollTrigger);
export const Footer = memo(() => {
  const [contentHeight, setContentHeight] = useState(0);
  const content = useRef();
  const myRef = useRef(null);
  const secondRef = useRef(null);
  const [isActive, setIsActive] = useState(-1);
  const faqsContent = [
    {
      title: "Find us",
      question: `Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. A delectus optio facilis maiores placeat similique
                id molestiae corporis dolorem quidem eos obcaecati quo
                        odio nihil quod, libero vero illo tempore.`,
    },
    {
      title: "Social",
      question: (
        <ul className={s.list}>
          <div className={s.listItem}>
            <UnderLine>YouTube</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Instagram</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>TikTok</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>X</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Facebook</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>LinkedIn</UnderLine>
          </div>
        </ul>
      ),
    },
    {
      title: "Nav",
      question: (
        <ul className={s.list}>
          <div className={s.listItem}>
            <UnderLine>Home</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Work</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Entertainment</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>About</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Feed</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Podcast</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Contract</UnderLine>
          </div>
          <div className={s.listItem}>
            <UnderLine>Shop</UnderLine>
          </div>
        </ul>
      ),
    },
  ];

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: `.${s.footerSticky}`,
        start: "top top",
        end: `bottom+=${window.innerHeight} top`,
        scrub: true,
        // markers: true,
        pin: true,
        // pinSpacing: false,
      });
    },
    { dependencies: [] }
  );
  useGSAP(
    () => {
      gsap.fromTo(
        secondRef.current,
        { y: "0%", rotation: 0 },
        {
          y: "-30%",
          rotation: -16,
          scrollTrigger: {
            trigger: myRef.current,
            start: "top top",
            end: `bottom bottom`,
            scrub: true,
            markers: true,
          },
          onEnter: () => {
            ScrollTrigger.update();
          },
        }
      );
    },
    { dependencies: [myRef.current, secondRef.current] }
  );

  useEffect(() => {
    setContentHeight(content.current?.clientHeight);
  }, [content.current]);

  return (
    <footer
      className={s.footer}
      // style={{ paddingBottom: `${contentHeight + contentHeight / 2}px` }}
      ref={myRef}
    >
      <div className={s.footerWrapper} ref={secondRef}>
        <h1 className={s.title}>
          <UnderLineWithArrows color={"#000"} text={"Let's go"} visible={true}>
            {/* <div className={s.titleText}>Let's go</div> */}
          </UnderLineWithArrows>
        </h1>
        <div className={s.lineWrapper}>
          <TheLine className={s.theLine} color={"#000"} needAnim={false} />
        </div>
        <div>
          <h1> LOL</h1>
        </div>
      </div>
      <div className={s.footerScroller}>
        <div className={s.footerSticky}>
          <img className={s.back} src="/footer/back.avif" alt="" />
          <div className={s.footerStickyInner}>
            <div className={s.footerContent} ref={content}>
              <div>
                <SectionTitle className={s.subTitle}>Reach out</SectionTitle>
                <div className={s.emails}>
                  <div className={s.number}>
                    <UnderLine color={"#fff"}>
                      <p>info@thelineanimation.com </p>
                    </UnderLine>
                  </div>
                  <div className={s.number}>
                    <span>/&nbsp;</span>

                    <UnderLine color={"#fff"}>
                      <p>44 (0)20 30020224</p>
                    </UnderLine>
                  </div>
                </div>
                <div className={s.faqWrapper}>
                  {faqsContent.map((item, index) => {
                    return (
                      <div
                        key={item.title}
                        className={`${s.faqItem} ${
                          isActive === index ? s.active : ""
                        }`}
                        onClick={() => {
                          if (isActive === index) {
                            setIsActive(-1);
                          } else {
                            setIsActive(index);
                          }
                        }}
                      >
                        <div className={s.faqVisible}>
                          <p className={s.faqTitle}>{item.title}</p>
                          <div className={s.iconWrapper}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={s.icon}
                              viewBox="0 -960 960 960"
                            >
                              <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                            </svg>
                          </div>
                        </div>
                        <div className={s.faqContentWrapper}>
                          <div className={s.faqContent}>
                            <div className={s.faqContentInner}>
                              {item.question}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={s.scroller}>
        <div className={s.gap} ref={gap}>
          <div className={s.sticky}></div>
          
        </div>
      </div> */}
    </footer>
  );
});
