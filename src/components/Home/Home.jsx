import React from "react";
import s from "./Home.module.css";
import { HomeCards } from "../HomeCards/HomeCards";
import { About } from "../About/About";
import { Partners } from "../Partners/Partners";
import { News } from "../News/News";
export const Home = () => {
  return (
    <div>
      <HomeCards />
      <div
        style={{
          // padding: "0.5rem",
          // background: "#fff",
          position: "relative",
          zIndex: "10",
        }}
      >
        <About />
        <Partners />
        <News />
      </div>
    </div>
  );
};
