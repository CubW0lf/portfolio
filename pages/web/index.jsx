import { find, getAll } from "../../directus/utils";
import styles from "../../styles/Web.module.css";
import ForeTaste from "../../components/ForeTaste/ForeTaste";
import Services from "../../components/Services/Services";
import Setup from "../../components/Setup/Setup";
import Overview from "../../components/Overview/Overview";
import Head from "next/head";
import { useUxContext } from "../../contexts/uxContext";
import { useEffect } from "react";

export async function getStaticProps() {
  const text = await find("web", 1);
  const projects = await getAll("web_project");
  const services = await getAll("web_service");
  const tools = await getAll("tool");
  return {
    props: {
      text,
      projects,
      services,
      tools,
    },
    revalidate: 30,
  };
}

const Web = ({ text, projects, services, tools }) => {
  const { setCurrentCategory } = useUxContext();

  useEffect(() => {
    setCurrentCategory("photo");
  }, [setCurrentCategory]);
  return (
    <>
      <Head>
        <title>Création de sites Web | Vincent Cottalorda</title>
        <meta
          name="description"
          content="Présentation des offres de création de sites et applications web. Vue d'ensemble, technologies, prestations, et quelques sites."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.web}>
        {text && <Overview text={text} category="Web" title="Communiquer avec la technologie" bg="#8b8784" />}
        {tools && <Setup setup={tools} title="Technologies" go="Prestations" />}
        {services && <Services services={services} go="des exemples de site" />}
        {projects && <ForeTaste projects={projects} title="Web Sites" />}
      </div>
    </>
  );
};

export default Web;
