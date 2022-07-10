import styles from "./Services.module.css";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import { TbDirections } from "react-icons/tb";
import Button from "../Button/Button";
import { useRouter } from "next/router";

const WebServices = ({ services, go }) => {
  const router = useRouter();
  return (
    <section className={styles.container} id="services">
      <h1>Prestations</h1>
      <div className={styles.services}>
        {services &&
          services.map((s) => (
            <div key={s.id} className={styles.service} style={{ backgroundColor: s.color }}>
              <div className={styles.fimgWrapper}>
                <Image src={getAssetURL(s.fimg.id)} layout="fill" alt="" objectFit="contain" className={styles.fimg} />
              </div>
              <h2>{s.name}</h2>
            </div>
          ))}
      </div>
      <div className={styles.buttonGroup}>
        <Button text="Besoin d'un Devis ?" color="#b8bdbc" action={() => router.push("/contact")} />
        <TbDirections />
        <a href="#forestate">
          <Button text={`Voir ${go}`} color="#b8bdbc" action={null} />
        </a>
      </div>
    </section>
  );
};

export default WebServices;
