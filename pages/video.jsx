import { find, getAll } from "../directus/utils";
import Services from "../components/Services/Services";
import Overview from "../components/Overview/Overview";
import styles from "../styles/Photo.module.css";
import Setup from "../components/Setup/Setup";
import ForeTaste from "../components/ForeTaste/ForeTaste";

const Photo = ({ text, clip, services, equipments }) => {
  return (
    <div className={styles.photo}>
      {text && <Overview text={text} title="Un septième art exigent" category="Vidéo" bg="#000" go="Materiel" />}
      {equipments && <Setup setup={equipments} title="Materiel" go="Prestations" />}
      {services && <Services services={services} go="Les Clips" />}
      {clip && <ForeTaste projects={clip} />}
    </div>
  );
};

export async function getStaticProps() {
  const text = await find("video", 1);
  const equipments = await getAll("video_equipment");
  const services = await getAll("video_service");
  const clip = await getAll("video_project");
  return {
    props: {
      text,
      equipments,
      services,
      clip,
    },
  };
}

export default Photo;
