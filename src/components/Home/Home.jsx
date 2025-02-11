import React, { Suspense } from "react";
import s from "./Home.module.css";

// Динамічне завантаження компонентів
const HomeCards = React.lazy(() => import("../HomeCards/HomeCards"));
const About = React.lazy(() => import("../About/About"));
const Partners = React.lazy(() => import("../Partners/Partners"));
const News = React.lazy(() => import("../News/News"));

export const Home = () => {
  return (
    <div>
      {/* Suspense з fallback для плавного завантаження */}
      <Suspense fallback={<div>Завантаження...</div>}>
        <HomeCards />
        <div
          style={{
            position: "relative",
            zIndex: "10",
          }}
        >
          <About />
          <Partners />
          <News />
        </div>
      </Suspense>
    </div>
  );
};
