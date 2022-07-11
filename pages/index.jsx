import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import notebook from "../public/assets/images/notebook.png";
import macbook from "../public/assets/images/macbook.png";
import typewritter from "../public/assets/images/typewritter.png";
import casque from "../public/assets/images/casque.png";
import logo from "../public/assets/images/logo.png";
import styles from "../styles/Home.module.css";
import About from "../components/About/About";
import Button from "../components/Button/Button";
import { find } from "../directus/utils";
import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import { GoTriangleDown } from "react-icons/go";
import Networks from "../components/Networks/Networks";

export default function Home({ page }) {
  const router = useRouter();
  return (
    <>
      <div className={styles.home}>
        <Head>
          <title>Portfolio Web Developpeur | Vincent Cottalorda</title>
          <meta
            name="description"
            content="Portfolio de Vincent Cottalorda: Sites Web, Photo, Vidéo. Web développeur et créateur polyvalent"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className={styles.container}>
          <div className={styles.title}>
            <h1>
              VINCENT
              <br />
              COTTALORDA
            </h1>
            <div className={styles.tagline}>
              <p>Ceci n&apos;est pas un développeur,</p>
              <p>mais un créateur polyvalent !</p>
              <p className={styles.categories}>
                <Link href="/web">
                  <a>web</a>
                </Link>
                <span className={styles.dot}>•</span>
                <Link href="/photo">
                  <a>photo</a>
                </Link>
                <span className={styles.dot}>•</span>
                <Link href="/video">
                  <a>vidéo</a>
                </Link>
                <span className={styles.dot}>•</span>
                <a href="https://www.mixcloud.com/cubw0lf/" target="_blank" rel="noreferrer">
                  musique
                </a>
              </p>
            </div>

            <div className={styles.macbook}>
              <div className={styles.fill}>
                <Image src={macbook} alt="" layout="fill" objectFit="contain" objectPosition="left bottom" />
              </div>
            </div>
            <div className={styles.typewritter}>
              <div className={styles.fill}>
                <Image src={typewritter} alt="" layout="fill" objectFit="contain" objectPosition="right top" />
              </div>
            </div>
          </div>
          <div className={styles.logo}>
            <div className={styles.logoContainer}>
              <Image src={logo} alt="" layout="fill" objectFit="contain" />
            </div>
          </div>
          <div className={styles.casque}>
            <Image src={casque} alt="" layout="responsive" objectFit="contain" />
          </div>
          <div className={styles.notebook}>
            <Image src={notebook} alt="" layout="responsive" objectFit="contain" />
          </div>
          <a href="#about" className={styles.down}>
            <GoTriangleDown />
          </a>
          <Button text="Besoin d'un devis ?" color="white" action={() => router.push("/contact")} />
        </section>
        <Networks />
        <About page={page} />
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const page = await find("page", 1);
  return {
    props: {
      page: page,
    },
  };
}
