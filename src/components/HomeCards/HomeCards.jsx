import React, { useEffect, useRef, useState } from "react";
import s from "./HomeCards.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { HomeCard } from "./HomeCard/HomeCard";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useGSAP } from "@gsap/react";
import { useContext } from "react";
import { HeaderContext } from "../Header/HeaderProvider";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { UnderLineWithArrows } from "../UnderLine/UnderLine";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
export const HomeCards = () => {
  const container = useRef();
  const cards = useRef([]);
  const cardsWrapper = useRef([]);
  const [back, setBack] = useState(false);
  const grid = useRef();
  const videos = useRef([]);
  const videosWrapper = useRef([]);
  // console.log(cards.current);

  const { setCustomColor, clearCustomColor } = useContext(HeaderContext);

  // setCustomColor("green")

  const lenisOptions = {
    lerp: 0.1, // Controls how smooth the scrolling is
    duration: 5, // Slows down or speeds up the scrolling
    smoothTouch: false, // Disable smooth scroll on touch devices
    smooth: true, // Smooth scroll for desktop (obviously)
  };

  const setCardRef = (el) => {
    if (el && !cards.current.includes(el)) {
      cards.current.push(el);
    }
  };
  const setVideoRef = (el) => {
    if (el && !videosWrapper.current.includes(el)) {
      videosWrapper.current.push(el);
    }
  };
  const setVideooRef = (el) => {
    if (el && !videos.current.includes(el)) {
      videos.current.push(el);
    }
  };

  // useEffect(() => {
  //   ScrollTrigger.refresh();
  // }, [cards.current.length]);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: grid.current,
        start: "top top",
        end: `+=${
          grid.current.clientHeight * cards.current?.length * 0.7
        } bottom`,
        pin: true,
        scrub: true,
        // anticipatePin: true,
        // markers: true,
        onEnter() {
          setCustomColor("#000");
        },
        onEnterBack() {
          setCustomColor("#000");
        },
        onLeaveBack() {
          setCustomColor("#fff");
        },
        onLeave() {
          setCustomColor("#000");
        },
        // anticipatePin: true,
      });
    },
    { dependencies: [] }
  );

  useGSAP(
    () => {
      videos.current.forEach((video, index) => {
        gsap.fromTo(
          video,
          {
            x: "48%",
            y: "27%",
            rotationZ: 16,
            transformOrigin: "0% 0%",
          },
          {
            x: "-50%",
            y: "0%",
            rotationZ: 0,

            scrollTrigger: {
              trigger: `.${s.cardsWrapper}`,

              start: `top+=${
                (index + 1) * window.innerHeight * 0.7 -
                (index > 1 ? window.innerHeight * 0.15 : 0)
              } bottom`,
              end: `top+=${(index + 2) * window.innerHeight * 0.7} bottom`,
              scrub: true,
              // markers: true,
            },
          }
        );
        gsap.fromTo(
          video,
          {
            x: "-50%",
            y: 0,
            scale: 1.25,
            rotationZ: 0,
            transformOrigin: "0% 0%",
          },
          {
            x: "-50%",

            scale: 1,
            scrollTrigger: {
              trigger: `.${s.cardsWrapper}`,
              start: `top+=${(index + 2) * window.innerHeight * 0.7} bottom`,
              end: `top+=${(index + 3) * window.innerHeight * 0.7} bottom`,
              scrub: true,
              // markers: true,
            },
          }
        );

        // const tl = gsap.timeline({

        // })
      });
    },
    { dependencies: [videos.current.length] }
  );

  useGSAP(
    () => {
      handleGSAP();
    },
    { dependencies: [cards.current.length] }
  );

  function handleGSAP() {
    cards.current.forEach((card, index) => {
      // console.log(index === 0 ? index + 1 : index + 1);

      const tl = gsap
        .timeline()
        .set(card, {
          x: "10%",
          y: window.innerHeight,
          rotationZ: 16,
          transformOrigin: "0 0%",
        })
        .fromTo(
          card,
          {
            x: "10%",
            y: window.innerHeight,
            rotationZ: 16,
            transformOrigin: "0 0%",
            // zIndex: index + cards.current.length,
          },
          {
            x: "0%",
            rotationZ: 0,
            y: 0,
            scrollTrigger: {
              id: index < 1 ? index : index + index,
              trigger: `.${s.cardsWrapper}`,
              start: `top+=${
                index * card.clientHeight * 0.7 -
                (index > 1 ? card.clientHeight * 0.15 : 0) +
                10
              } bottom`,
              end: `top+=${(index + 1) * card.clientHeight * 0.7} bottom`,
              scrub: true,
              onEnterBack() {
                if (index === 1) {
                  setBack(false);
                }
              },
              // markers: true,
            },
            onStart() {
              card.style.zIndex = index + cards.current.length;
              // if (index === 1) {
              //   setBack(!back);
              // }
            },

            onComplete() {
              if (index === 1) {
                setBack(true);
              }
            },
          }
        );
      if (index !== cards.current?.length - 1) {
        tl.fromTo(
          card,
          {
            x: "0%",
            y: 0,
            rotationZ: 0,

            transformOrigin: "0% 0%",
          },
          {
            x: "-5%",
            y: "-20%",
            // width: "120%",
            rotationZ: -1,
            // background: "#345314",

            scrollTrigger: {
              id: index < 1 ? index + 1 : index + index + 1,
              trigger: `.${s.cardsWrapper}`,
              start: `top+=${
                (index + 1) * card.clientHeight * 0.7 + 10
              } bottom`,
              end: `top+=${(index + 2) * card.clientHeight * 0.7} bottom`,
              scrub: true,
              // markers: true,
            },
          }
        );
      }
      // gsap.to(card, {
      //   x: "10%",
      //   y: window.innerHeight,
      //   rotationZ: 16,
      //   transformOrigin: "top left",
      // });
    });
  }

  // const [bigFrame, setBigFrame] = useState(0);
  // const [middleFrame, setMiddleFrame] = useState(0);
  // const [smallFrame, setSmallFrame] = useState(0);
  const bigFrame = useRef();
  const middleFrame = useRef();
  const smallFrame = useRef();

  return (
    <div>
      <div
        className={s.cardsWrapper}
        ref={container}
        style={{ "--cards": `${4}` }}
      >
        <div className={`${s.cardsGrid} ${back ? s.back : ""}`} ref={grid}>
          <HomeCard ref={setCardRef} wrapper={cardsWrapper}>
            <div className={s.firstCard}>
              <SectionTitle>About the line</SectionTitle>
              <h1 className={s.cardTitle}>Highlights</h1>
              <ul className={s.list}>
                {/* <li className={s.item}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                  <span>Work</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </li> */}
                <li className={s.item}>
                  <UnderLineWithArrows
                    full={true}
                    color={"#000"}
                    visible={true}
                  >
                    Work
                  </UnderLineWithArrows>
                </li>
                <li className={s.item}>
                  <UnderLineWithArrows
                    full={true}
                    color={"#000"}
                    visible={true}
                  >
                    The Studio
                  </UnderLineWithArrows>
                </li>
              </ul>
            </div>
          </HomeCard>
          <HomeCard ref={setCardRef} wrapper={cardsWrapper}>
            <div className={s.card}>
              <h1 className={s.title}>The Hex - Warframe: 1999</h1>
              <div className={s.videoWrapper} ref={(ref) => setVideoRef(ref)}>
                <video
                  ref={(ref) => setVideooRef(ref)}
                  src="/cards/1.mp4"
                  className={s.video}
                  autoPlay
                  muted
                  loop
                ></video>
              </div>
              <div className={s.bigFrame} ref={bigFrame}>
                <div className={s.frameContent}>
                  <p className={s.frameText}>OVERSCAN</p>
                  <p
                    className={s.frameText}
                  >{`${bigFrame.current?.clientWidth}x${bigFrame.current?.clientHeight}`}</p>
                </div>

                <div className={s.middleFrame} ref={middleFrame}>
                  <div className={s.dashes}>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.cross}></div>
                  </div>
                  <div className={s.frameContent}>
                    <p className={s.frameText}>Crop</p>
                    <p
                      className={s.frameText}
                    >{`${middleFrame.current?.clientWidth}x${middleFrame.current?.clientHeight}`}</p>
                  </div>

                  <div className={s.smallFrame} ref={smallFrame}>
                    <div className={s.frameContent}>
                      <p className={s.frameText}>Action Safe</p>
                      <p
                        className={s.frameText}
                      >{`${smallFrame.current?.clientWidth}x${smallFrame.current?.clientHeight}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HomeCard>
          <HomeCard ref={setCardRef} wrapper={cardsWrapper}>
            <div className={s.card}>
              <h1 className={s.title}>The Hex - Warframe: 1999</h1>
              <div ref={(ref) => setVideoRef(ref)}>
                <video
                  ref={(ref) => setVideooRef(ref)}
                  src="/cards/2.mp4"
                  className={s.video}
                  autoPlay
                  muted
                  loop
                ></video>
              </div>
              <div className={s.bigFrame} ref={bigFrame}>
                <div className={s.frameContent}>
                  <p className={s.frameText}>OVERSCAN</p>
                  <p
                    className={s.frameText}
                  >{`${bigFrame.current?.clientWidth}x${bigFrame.current?.clientHeight}`}</p>
                </div>

                <div className={s.middleFrame} ref={middleFrame}>
                  <div className={s.dashes}>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.cross}></div>
                  </div>
                  <div className={s.frameContent}>
                    <p className={s.frameText}>Crop</p>
                    <p
                      className={s.frameText}
                    >{`${middleFrame.current?.clientWidth}x${middleFrame.current?.clientHeight}`}</p>
                  </div>

                  <div className={s.smallFrame} ref={smallFrame}>
                    <div className={s.frameContent}>
                      <p className={s.frameText}>Action Safe</p>
                      <p
                        className={s.frameText}
                      >{`${smallFrame.current?.clientWidth}x${smallFrame.current?.clientHeight}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HomeCard>
          <HomeCard ref={setCardRef} wrapper={cardsWrapper}>
            <div className={s.card}>
              <h1 className={s.title}>The Hex - Warframe: 1999</h1>
              <div ref={(ref) => setVideoRef(ref)}>
                <video
                  ref={(ref) => setVideooRef(ref)}
                  src="/cards/3.mp4"
                  className={s.video}
                  autoPlay
                  muted
                  loop
                ></video>
              </div>
              <div className={s.bigFrame} ref={bigFrame}>
                <div className={s.frameContent}>
                  <p className={s.frameText}>OVERSCAN</p>
                  <p
                    className={s.frameText}
                  >{`${bigFrame.current?.clientWidth}x${bigFrame.current?.clientHeight}`}</p>
                </div>

                <div className={s.middleFrame} ref={middleFrame}>
                  <div className={s.dashes}>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.dash}></div>
                    <div className={s.cross}></div>
                  </div>
                  <div className={s.frameContent}>
                    <p className={s.frameText}>Crop</p>
                    <p
                      className={s.frameText}
                    >{`${middleFrame.current?.clientWidth}x${middleFrame.current?.clientHeight}`}</p>
                  </div>

                  <div className={s.smallFrame} ref={smallFrame}>
                    <div className={s.frameContent}>
                      <p className={s.frameText}>Action Safe</p>
                      <p
                        className={s.frameText}
                      >{`${smallFrame.current?.clientWidth}x${smallFrame.current?.clientHeight}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HomeCard>
        </div>
      </div>
    </div>
  );
};
