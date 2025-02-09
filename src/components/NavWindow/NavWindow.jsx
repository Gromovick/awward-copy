import React, { useEffect, useRef, useState } from "react";
import s from "./NavWindow.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
export const NavWindow = ({ state, setState }) => {
  const navbar = [
    { title: "Home", path: ["/home", "/"] },
    { title: "Work", path: "/work" },
    { title: "Entertainment", path: "/entertainment" },
    { title: "About", path: "/about" },
    { title: "Feed", path: "/feed" },
    { title: "Podcast", path: "/podcast" },
    { title: "Contact", path: "/contact" },
    { title: "Shop", path: "/shop" },
  ];

  const timeline = useRef();

  const path = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useGSAP(
    () => {
      if (!timeline.current) {
        const tl = gsap.timeline({ paused: true });
        tl.to(`.${s.wrapper}`, {
          x: "0%",
          y: "0%",
          duration: 0.45,
          stagger: 0.05,
          rotation: 0,
        });
        timeline.current = tl;
      }
    },
    { dependencies: [] }
  );

  useEffect(() => {
    if (windowWidth > 888) {
      setState(false);
    }
  }, [windowWidth]);

  useGSAP(
    () => {
      if (state) {
        timeline.current?.play();
      } else {
        timeline.current?.reverse();
      }
    },
    { dependencies: [state] }
  );

  return (
    <>
      <div className={s.wrapper} style={{ background: "#fff" }}></div>
      <div className={s.wrapper}>
        <nav className={s.navWrapper}>
          <img className={s.backImg} src="/hero/back.avif" alt="" />
          {/* <ul className={s.nav}>
          <li className={s.navItem}></li>
        </ul> */}

          <ul className={s.nav}>
            {navbar.map((e, index) => {
              const isActive =
                path.pathname === e.path ||
                (Array.isArray(e.path) && e.path.includes(path.pathname));
              const goTo = Array.isArray(e.path) ? e.path[0] : e.path;
              return (
                <li
                  className={`${s.navItem} ${isActive ? s.active : ""}`}
                  key={index}
                >
                  <AnimatePresence>
                    <motion.div
                      className={s.navDot}
                      animate={{
                        transform: isActive ? "scale(1)" : "scale(0)",
                        opacity: isActive ? 1 : 0,
                        width: isActive ? "2.5rem" : "0rem",
                        height: isActive ? "2.5rem" : "0rem",
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  <Link to={goTo}>{e.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};
