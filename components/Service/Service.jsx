import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import styles from "./Service.module.css";

const Service = ({ service }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: service.color }}>
      <div className={styles.fimgWrapper}>
        <Image src={getAssetURL(service.fimg.id)} layout="fill" alt="" objectFit="contain" className={styles.fimg} />
      </div>
      <h2>{service.name}</h2>
    </div>
  );
};

export default Service;
