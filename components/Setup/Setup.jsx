import styles from "./Setup.module.css";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import { FiArrowDown } from "react-icons/fi";
import Link from "next/link";
import { useUxContext } from "../../contexts/uxContext";
import { useRouter } from "next/router";

const Setup = ({ setup, title }) => {
  const { setRedirect } = useUxContext();

  const router = useRouter();

  return (
    <section className={styles.container} id="setup">
      <h1>{title}</h1>
      <div className={styles.setup}>
        {setup &&
          setup.map((s) => (
            <div key={s.id} className={styles.item} onClick={() => setRedirect(router.route)}>
              <Link href={`${s.category}/${s.id}`}>
                <a className={styles.fimgContainer}>
                  <Image src={getAssetURL(s.fimg.id)} layout="fill" alt="" objectFit="contain" className={styles.fimg} />
                </a>
              </Link>

              <h2>{s.name}</h2>
              <h3>{s.feature}</h3>
            </div>
          ))}
      </div>
      <a href="#services" className="down">
        <FiArrowDown />
      </a>
    </section>
  );
};

export default Setup;
