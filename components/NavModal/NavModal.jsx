import Link from "next/link";
import styles from "./NavModal.module.css";
import { useUxContext } from "../../contexts/uxContext";
import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import logo from "../../public/assets/images/logo.png";
import Image from "next/image";

const NavModal = () => {
  const { setMenuVisible, menuVisible } = useUxContext();

  const backdrop = useRef();

  return (
    <Dialog open={menuVisible} onClose={() => setMenuVisible(false)} initialFocus={backdrop}>
      <ul className={styles.container}>
        <li className={menuVisible ? styles.enter : styles.leave} onClick={() => setMenuVisible(false)}>
          <Link href="/" tabIndex="-1">
            <a>
              <span>Accueil</span>
            </a>
          </Link>
          <span>Le début du commencement</span>
        </li>

        <li className={menuVisible ? styles.enter : styles.leave} onClick={() => setMenuVisible(false)}>
          <Link href="/web">
            <a>
              <span>Web</span>
            </a>
          </Link>
          <span>La communication moderne</span>
        </li>

        <li className={menuVisible ? styles.enter : styles.leave} onClick={() => setMenuVisible(false)}>
          <Link href="/photo">
            <a>
              <span>Photo</span>
            </a>
          </Link>
          <span>Tout est dans le détail</span>
        </li>

        <li className={menuVisible ? styles.enter : styles.leave} onClick={() => setMenuVisible(false)}>
          <Link href="/video">
            <a>
              <span>Vidéo</span>
            </a>
          </Link>
          <span>Un septième art exigeant</span>
        </li>

        <li className={menuVisible ? styles.enter : styles.leave} onClick={() => setMenuVisible(false)}>
          <Link href="/contact">
            <a>
              <span>Contact</span>
            </a>
          </Link>
          <span>Pour toute question ou devis</span>
        </li>
      </ul>

      <Dialog.Overlay ref={backdrop} className={styles.backdrop} onClick={() => setMenuVisible(false)}>
        <div className={styles.logo}>
          <Image src={logo} alt="" layout="responsive" className={menuVisible ? styles.fade : styles.fadedown} />
        </div>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default NavModal;
