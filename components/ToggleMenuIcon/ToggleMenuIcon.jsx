import styles from "./ToggleMenuIcon.module.css";
import { useUxContext } from "../../contexts/uxContext";
import { useState } from "react";

const ToggleMenuIcon = () => {
  const { menuVisible, setMenuVisible } = useUxContext();

  return (
    <div className={`${menuVisible ? styles.cross : styles.burger}`} onClick={() => setMenuVisible(!menuVisible)}>
      <div className={styles.line1}></div>
      <div className={styles.line2}></div>
      <div className={styles.line3}></div>
    </div>
  );
};

export default ToggleMenuIcon;
