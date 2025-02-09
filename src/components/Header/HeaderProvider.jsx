import React, { createContext, useState } from "react";
import { Header } from "./Header";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [custom, setCustom] = useState("#fff");
  const [isCustom, setIsCustom] = useState(false);

  function setCustomColor(color) {
    setIsCustom(true);
    setCustom(color);
  }
  function clearCustomColor() {
    setIsCustom(false);
    setCustom("#fff");
  }
  return (
    <>
      <HeaderContext.Provider
        value={{
          setCustomColor: setCustomColor,
          clearCustomColor: clearCustomColor,
        }}
      >
        <Header custom={custom} isCustom={isCustom} />
        {children}
      </HeaderContext.Provider>
    </>
  );
};
