import Image from "next/image";
import laptop from "../../public/assets/images/laptop.png";
import styles from "./Overview.module.css";
import { FiArrowDown } from "react-icons/fi";
import Button from "../Button/Button";
import Router, { useRouter } from "next/router";

const Overview = ({ text, category, title, bg }) => {
  const router = useRouter();
  return (
    <section className={styles.container} style={{ backgroundColor: bg }}>
      <div className={styles.laptopContainer}>
        <Image src={laptop} layout="fill" objectFit="cover" alt="" />
      </div>
      <div className={styles.overview}>
        <h1>{category}</h1>
        <hr />
        <h2>{title}</h2>
        {text && <div dangerouslySetInnerHTML={{ __html: text.introduction }}></div>}
        <Button text="Besoin d'un devis ?" action={() => Router.push("/contact")} className={styles.button} />
        <a href="#setup" className="down">
          <FiArrowDown />
        </a>
      </div>
    </section>
  );
};

export default Overview;
