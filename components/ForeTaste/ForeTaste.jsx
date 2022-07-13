import styles from "./ForeTaste.module.css";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import logo from "../../public/assets/images/logo.png";
import Link from "next/link";
import { useUxContext } from "../../contexts/uxContext";
import { useRouter } from "next/router";

const WebProjects = ({ projects }) => {
  const { setRedirect } = useUxContext();

  const router = useRouter();
  return (
    <section className={styles.container} id="forestate">
      <h1>Des exemples ?</h1>
      <div className={styles.grid}>
        {projects &&
          projects.map((p) => (
            <div
              key={p.id}
              className={styles.projet}
              style={{ backgroundColor: p.color }}
              onClick={() => setRedirect(router.route)}
            >
              <Link href={`${p.type}${p.id}`}>
                <a>
                  <div className={styles.fimgWrapper}>
                    <div className={styles.fimgContainer}>
                      <Image src={getAssetURL(p.fimg.id)} layout="fill" alt="" objectFit="cover" className={styles.fimg} />
                    </div>
                  </div>

                  <h2>{p.name.length > 12 ? `${p.name.slice(0, 12)} ...` : p.name}</h2>
                  <div className={styles.logoWrapper}>
                    <div className={styles.logoContainer}>
                      <Image src={logo} layout="fill" alt="" objectFit="contain" className={styles.logo} />
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default WebProjects;
