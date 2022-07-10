import { useState } from "react";
import { createContext, useContext } from "react";

const uxContext = createContext();

export const UxWrapper = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState("");
  const [redirect, setRedirect] = useState(null);

  const deleteMessage = () => {
    setFlash("");
  };

  const handleFlash = (type, text, duration) => {
    setFlashType(type);
    setFlash(text);
    setTimeout(deleteMessage, duration);
  };

  return (
    <uxContext.Provider value={{ menuVisible, setMenuVisible, flash, flashType, handleFlash, redirect, setRedirect }}>
      {children}
    </uxContext.Provider>
  );
};

export const useUxContext = () => {
  return useContext(uxContext);
};
