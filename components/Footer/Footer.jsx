import { useEffect, useState } from "react";
import { find, getAll } from "../../directus/utils";
import styles from "./Footer.module.css";
import { GrLocation, GrMail } from "react-icons/gr";
import { IoPhonePortraitOutline } from "react-icons/io5";

const Footer = () => {
  const [infos, setInfos] = useState(null);
  const [softSkills, setSoftSkills] = useState(null);
  const [hardSkills, setHardSkills] = useState(null);

  useEffect(() => {
    find("infos", 1)
      .then((response) => setInfos(response))
      .catch((error) => console.log(error));
    getAll("softskill")
      .then((response) => setSoftSkills(response))
      .catch((error) => console.log(error));
    getAll("skill")
      .then((response) => setHardSkills(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.softSkills}>
        <h2>Soft Skills</h2>
        <ul>{softSkills && softSkills.map((s) => <li key={s.id}>{s.name}</li>)}</ul>
      </div>

      <div className={styles.cloud}>
        <h2>Hard Skills</h2>
        <ul>{hardSkills && hardSkills.map((s) => <li key={s.id}>{s.name}</li>)}</ul>
      </div>
      <div className={styles.infos}>
        <h2>Me contacter</h2>
        <div className={styles.center}>
          <p>
            <GrLocation /> {infos && infos.adress}
          </p>
          <a href={`tel:${infos && infos.phone}`}>
            <IoPhonePortraitOutline /> {infos && infos.phone.match(/(.{1,2})/g).join(" ")}
          </a>
          <a href={`mailto:${infos && infos.mail}`}>
            <GrMail />
            {infos && infos.mail}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
