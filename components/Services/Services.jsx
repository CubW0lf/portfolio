import styles from "./Services.module.css";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import { TbDirections } from "react-icons/tb";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import Service from "../Service/Service";

const WebServices = ({ services, go }) => {
  const router = useRouter();
  return (
    <section className={styles.container} id="services">
      <h1>Prestations</h1>
      <div className={styles.services}>{services && services.map((s) => <Service service={s} key={s.id} />)}</div>
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
