import correction from "../../public/assets/images/correction.png";
import styles from "./About.module.css";
import Image from "next/image";
import getAssetsURL from "../../directus/getAssets";

const About = ({ page }) => {
  return (
    <section className={styles.container} id="about">
      <div className={styles.bio}>
        <a href="https://youtu.be/bFyAM9MRk64" target="_blank" rel="noreferrer" className={styles.title}>
          <h1 className="yellow-text">{page && page.name}</h1>
          <span>
            {page && page.subtitle}
            <div className={styles.correction}>
              <Image src={correction} alt="" layout="responsive" />
            </div>
          </span>
          <hr />
          <h2>Quelques mots sur moi</h2>
        </a>
        <div className={styles.darkText} dangerouslySetInnerHTML={{ __html: page && page.text }}></div>
      </div>
      <div className={styles.meContainer}>
        {page && <Image src={getAssetsURL(page.featured_image.id)} alt="" layout="fill" objectFit="cover" />}
      </div>
    </section>
  );
};

export default About;
