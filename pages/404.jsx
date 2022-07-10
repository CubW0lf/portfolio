import Link from "next/link";
import styles from "../styles/NotFound.module.css";
import logo from "../public/assets/images/logo.png";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Vous êtes perdus ?</h1>
        <q>
          Faut arrêter ces conneries de nord et de sud ! Une fois pour toutes, le nord, suivant comment on est tourné, ça
          change tout !
        </q>
        <cite>Perceval - Kaamelott</cite>
        <Link href="/">
          <a>
            <span>Retour à l&apos;accueil</span>
          </a>
        </Link>
      </div>
      <Image src={logo} layout="fill" objectFit="contain" alt="" className={styles.logo} />
    </div>
  );
};

export default NotFound;
