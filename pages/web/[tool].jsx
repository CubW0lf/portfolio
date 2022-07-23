import styles from "../../styles/Techno.module.css";
import { getAll, find } from "../../directus/utils";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import { MdOutlineArrowBack } from "react-icons/md";
import { useUxContext } from "../../contexts/uxContext";
import { useRouter } from "next/router";
import Head from "next/head";

export async function getStaticProps(context) {
  const id = context.params.tool;
  const tool = await find("tool", id);
  return {
    props: {
      tool,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const tools = await getAll("tool");

  const paths = tools.map((item) => ({
    params: { tool: item.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

const SetupSingle = ({ tool }) => {
  const { redirect } = useUxContext();

  const router = useRouter();
  return (
    tool && (
      <>
        <Head>
          <title>{`${tool.name} ${tool.feature} | Vincent Cottalorda`}</title>
          <meta name="description" content={`Technologies Web, présentation de ${tool.name}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <article className={styles.container}>
          <div className={styles.back} onClick={() => router.push(redirect)}>
            <MdOutlineArrowBack />
          </div>
          <header className={styles.header}>
            <h1>{tool.name}</h1>
            <h2>{tool.feature}</h2>
            <div className={styles.fimgContainer}>
              <div className={styles.fimgRelative}>
                <Image src={getAssetURL(tool.fimg.id)} alt="" layout="fill" objectFit="contain" />
              </div>
            </div>
          </header>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: tool.text }} className={styles.body}></div>
        </article>
      </>
    )
  );
};

export default SetupSingle;
