import React, { useState } from "react";
import s from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NavWindow } from "../NavWindow/NavWindow";
export const Header = ({ isCustom, custom }) => {
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

  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const path = useLocation();
  // console.log("PATH", path.pathname);

  return (
    <div
      className={`${s.wrapper} ${isCustom ? s.custom : ""}`}
      style={{ "--custom": custom }}
    >
      <div className={s.logo}>LOGO</div>
      <ul className={`${s.navigation} ${isCustom ? s.custom : ""}`}>
        {navbar.map((e, index) => {
          const isActive =
            path.pathname === e.path ||
            (Array.isArray(e.path) && e.path.includes(path.pathname));
          const goTo = Array.isArray(e.path) ? e.path[0] : e.path;
          return (
            <div className={s.navItemWrapper} key={e.title}>
              <AnimatePresence>
                <motion.div
                  className={s.navDot}
                  animate={{
                    transform: isActive ? "scale(1)" : "scale(0)",
                    opacity: isActive ? 1 : 0,
                    width: isActive ? "0.75rem" : "0rem",
                    height: isActive ? "0.75rem" : "0rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </AnimatePresence>
              <li className={`${s.navItem} ${isActive ? s.active : ""}`}>
                <Link to={goTo}>{e.title}</Link>
              </li>
              {index < navbar.length - 1 ? <i className={s.navGap}>/</i> : ""}
            </div>
          );
        })}
      </ul>
      <button
        className={`${s.burger} ${isVisible ? s.active : s.back} ${
          !isVisible ? s.custom : ""
        }`}
        onClick={handleVisible}
      >
        <div className={s.line}></div>
        <div className={s.line}></div>
      </button>
      <NavWindow state={isVisible} setState={setIsVisible} />
    </div>
  );
};
