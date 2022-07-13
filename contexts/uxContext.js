import { useRouter } from "next/router";
import { useState } from "react";
import { createContext, useContext } from "react";

const uxContext = createContext();

export const UxWrapper = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const router = useRouter();

  const deleteMessage = () => {
    setFlash("");
  };

  const handleFlash = (type, text, duration) => {
    setFlashType(type);
    setFlash(text);
    setTimeout(deleteMessage, duration);
  };

  const handleRedirect = () => {
    if (redirect !== null) {
      router.push(`${redirect}#forestate`);
    } else {
      switch (currentCategory) {
        case "photo":
          router.push("/photo#forestate");
          break;
        case "web":
          router.push("/web#forestate");
          break;
        case "video":
          router.push("/video#forestate");
          break;
      }
    }
  };

  return (
    <uxContext.Provider
      value={{
        menuVisible,
        setMenuVisible,
        flash,
        flashType,
        handleFlash,
        redirect,
        setRedirect,
        currentCategory,
        setCurrentCategory,
        handleRedirect,
      }}
    >
      {children}
    </uxContext.Provider>
  );
};

export const useUxContext = () => {
  return useContext(uxContext);
};
