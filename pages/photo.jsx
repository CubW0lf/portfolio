import { find, getAll } from "../directus/utils";
import Services from "../components/Services/Services";
import Overview from "../components/Overview/Overview";
import styles from "../styles/Photo.module.css";
import Setup from "../components/Setup/Setup";
import ForeTaste from "../components/ForeTaste/ForeTaste";

const Photo = ({ text, shooting, services, equipments }) => {
  return (
    <div className={styles.photo}>
      {text && <Overview text={text} title="Tout est dans le détail" category="Photo" bg="#000" go="Materiel" />}
      {equipments && <Setup setup={equipments} title="Materiel" go="Prestations" />}
      {services && <Services services={services} go="Les Shootings" />}
      {shooting && <ForeTaste projects={shooting} />}
    </div>
  );
};

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
  };
}

export default Photo;
