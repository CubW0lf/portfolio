import styles from "../../styles/Techno.module.css";
import { getAll, find } from "../../directus/utils";
import Image from "next/image";
import getAssetURL from "../../directus/getAssets";
import { MdOutlineArrowBack } from "react-icons/md";
import { useUxContext } from "../../contexts/uxContext";
import { useRouter } from "next/router";
import Head from "next/head";

const SetupSingle = ({ equipment }) => {
  const { redirect } = useUxContext();

  const router = useRouter();
  return (
    equipment && (
      <>
        <Head>
          <title>{`${equipment.name} ${equipment.feature} | Vincent Cottalorda`}</title>
          <meta name="description" content={`Materiel Photo, présentation du ${equipment.name}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <article className={styles.container}>
          <div className={styles.back} onClick={() => router.push(redirect)}>
            <MdOutlineArrowBack />
          </div>
          <header className={styles.header}>
            <h1>{equipment.name}</h1>
            <h2>{equipment.feature}</h2>
            <div className={styles.fimgContainer}>
              <div className={styles.fimgRelative}>
                <Image src={getAssetURL(equipment.fimg.id)} alt="" layout="fill" objectFit="contain" />
              </div>
            </div>
          </header>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: equipment.description }} className={styles.body}></div>
        </article>
      </>
    )
  );
};

export async function getStaticProps(context) {
  const id = context.params.equipment;
  const equipment = await find("photo_equipment", id);
  return {
    props: {
      equipment,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const equipments = await getAll("photo_equipment");

  const paths = equipments.map((item) => ({
    params: { equipment: item.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default SetupSingle;
