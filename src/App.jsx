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
      <HeaderProvider>
        <VideoBack />
        <Hero />
        <Home />
        <Footer />
      </HeaderProvider>
    </div>
  );
}

export default App;
