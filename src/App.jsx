import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { VideoBack } from "./components/VideoBack/VideoBack";
import { Hero } from "./components/Hero/Hero";
import { Home } from "./components/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { HeaderProvider } from "./components/Header/HeaderProvider";
import { NavWindow } from "./components/NavWindow/NavWindow";

function App() {
  return (
    <div className={"App"}>
      {/* <NavWindow /> */}
      <HeaderProvider>
        <VideoBack />
        <Hero />
        {/* <div style={{height: "100vh"}}></div> */}
        <Home />
        <Footer />
      </HeaderProvider>
    </div>
  );
}

export default App;
