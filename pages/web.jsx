import { find, getAll } from "../directus/utils";
import styles from "../styles/Web.module.css";
import ForeTaste from "../components/ForeTaste/ForeTaste";
import Services from "../components/Services/Services";
import Setup from "../components/Setup/Setup";
import Overview from "../components/Overview/Overview";

const Web = ({ text, projects, services, tools }) => {
  return (
    <div className={styles.web}>
      {text && <Overview text={text} category="Web" title="Communiquer avec la technologie" bg="#8b8784" />}
      {tools && <Setup setup={tools} title="Technologies" go="Prestations" />}
      {services && <Services services={services} go="des exemples de site" />}
      {projects && <ForeTaste projects={projects} />}
    </div>
  );
};

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
  };
}

export default Web;
