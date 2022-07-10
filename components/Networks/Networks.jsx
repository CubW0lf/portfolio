import { useEffect, useState } from "react";
import styles from "./Networks.module.css";
import { getAll } from "../../directus/utils";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";

const Networks = () => {
  const [networks, setNetworks] = useState(null);

  useEffect(() => {
    getAll("network")
      .then((response) => setNetworks(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ul className={styles.container}>
      {networks &&
        networks.map((n) => (
          <a href={n.url} target="_BLANK" rel="noreferrer" key={n.id}>
            <li>
              <div className={styles.imgContainer}>
                <Image src={getAssetURL(n.logo.id)} alt="" layout="fill" objectFit="contain" />
              </div>
            </li>
          </a>
        ))}
    </ul>
  );
};

export default Networks;
