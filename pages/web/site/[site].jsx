import styles from "../../../styles/Website.module.css";
import { getAll, find } from "../../../directus/utils";
import Image from "next/image";
import getAssetURL from "../../../directus/getAssets";
import { MdOutlineArrowBack } from "react-icons/md";
import { useUxContext } from "../../../contexts/uxContext";
import { useRouter } from "next/router";
import Head from "next/head";
import { MdOutlineHttp } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const SetupSingle = ({ site }) => {
  dayjs.locale("fr");
  const { handleRedirect } = useUxContext();

  const router = useRouter();

  if (router.isFallback) {
    return <div>Chargement de la Page ...</div>;
  }

  return (
    site && (
      <>
        <Head>
          <title>{`${site.name} | Vincent Cottalorda`}</title>
          <meta name="description" content={`Présentation du site ${site.name}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <article className={styles.container}>
          <div className={styles.back} onClick={handleRedirect}>
            <MdOutlineArrowBack />
          </div>
          <header className={styles.header}>
            <h1>{site.name}</h1>
            <h2>{dayjs(site.created_at).format("DD MMMM YYYY")}</h2>
            <div className={styles.fimgContainer}>
              <div className={styles.fimgRelative}>
                <Image src={getAssetURL(site.fimg.id)} alt="" layout="fill" objectFit="contain" />
              </div>
            </div>
          </header>
          <hr />
          <div className={styles.tags}>
            {site.techno.map((t, index) => (
              <span className={styles.tag} key={index}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.buttonGroup}>
            <a href={site.url} target="_Blank" rel="noreferrer" className={styles.button}>
              Voir le Site <MdOutlineHttp />
            </a>
            <a href={site.github} target="_BLANK" rel="noreferrer" className={styles.button}>
              Voir Le Github <BsGithub />
            </a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: site.description }} className={styles.body}></div>
        </article>
      </>
    )
  );
};

export async function getStaticPaths() {
  const sites = await getAll("web_project");

  const paths = sites.map((item) => ({
    params: { site: item.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.site;
  const site = await find("web_project", id);
  return {
    props: {
      site,
    },
    revalidate: 30,
  };
}

export default SetupSingle;
