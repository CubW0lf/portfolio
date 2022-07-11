import styles from "../../../styles/Shooting.module.css";
import { getAll, find } from "../../../directus/utils";
import Image from "next/image";
import getAssetURL from "../../../directus/getAssets";
import { MdOutlineArrowBack } from "react-icons/md";
import { useUxContext } from "../../../contexts/uxContext";
import { useRouter } from "next/router";
import Head from "next/head";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const Clip = ({ clip }) => {
  dayjs.locale("fr");
  const { redirect } = useUxContext();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${clip.name} | Vincent Cottalorda`}</title>
        <meta name="description" content={`Présentation du clip ${clip.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className={styles.container}>
        <div className={styles.back} onClick={() => router.push(redirect)}>
          <MdOutlineArrowBack />
        </div>
        <header className={styles.header}>
          <h1>{clip.name}</h1>
          <h2>{dayjs(clip.shot_on).format("DD MMMM YYYY")}</h2>
          <div className={styles.fimgContainer}>
            <div className={styles.fimgRelative}>
              <Image src={getAssetURL(clip.fimg.id)} alt="" layout="fill" objectFit="contain" />
            </div>
          </div>
        </header>
        <hr />
        <div className={styles.tags}>
          {clip.tags &&
            clip.tags.map((t, index) => (
              <span className={styles.tag} key={index}>
                {t}
              </span>
            ))}
        </div>
        <iframe
          style={{ marginTop: "3vh", width: "100%", height: "80vh" }}
          height="790"
          src={clip.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {/* <div dangerouslySetInnerHTML={{ __html: clip.description }} className={styles.body}></div> */}
      </article>
    </>
  );
};

export async function getStaticProps(context) {
  const id = context.params.clip;
  const clip = await find("video_project", id);
  return {
    props: {
      clip,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const clips = await getAll("video_project");

  const paths = clips.map((item) => ({
    params: { clip: item.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default Clip;
