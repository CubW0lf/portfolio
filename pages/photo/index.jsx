import { find, getAll } from "../../directus/utils";
import Services from "../../components/Services/Services";
import Overview from "../../components/Overview/Overview";
import styles from "../../styles/Photo.module.css";
import Setup from "../../components/Setup/Setup";
import ForeTaste from "../../components/ForeTaste/ForeTaste";
import Head from "next/head";
import { useEffect } from "react";
import { useUxContext } from "../../contexts/uxContext";

export async function getStaticProps() {
  const text = await find("photo", 1);
  const shooting = await getAll("shooting");
  const services = await getAll("photo_service");
  const equipments = await getAll("photo_equipment");
  return {
    props: {
      text,
      equipments,
      services,
      shooting,
    },
    revalidate: 30,
  };
}

const Photo = ({ text, shooting, services, equipments }) => {
  const { setCurrentCategory } = useUxContext();

  useEffect(() => {
    setCurrentCategory("photo");
  }, [setCurrentCategory]);

  return (
    <>
      <Head>
        <title>Prestations Photo | Vincent Cottalorda</title>
        <meta
          name="description"
          content="Présentation du domaine de la photo. Vue d'ensemble, mon materiel, mes prestations, et quelques Shootings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.photo}>
        {text && <Overview text={text} title="Tout est dans le détail" category="Photo" bg="#000" go="Materiel" />}
        {equipments && <Setup setup={equipments} title="Materiel" go="Prestations" />}
        {services && <Services services={services} go="Les Shootings" />}
        {shooting && <ForeTaste projects={shooting} title="Shootings" />}
      </div>
    </>
  );
};

export default Photo;
