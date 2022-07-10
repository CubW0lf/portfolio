import { useInView } from "react-intersection-observer";
import styles from "./Skill.module.css";

const Skill = ({ skill }) => {
  const { ref, inView } = useInView({});
  return (
    <div className={styles.Skill} ref={ref}>
      <span>{skill.name}</span>
      <div className={styles.progress}>
        <div className={styles.value} style={{ width: `${skill.value}%` }}>
          <div className={inView ? styles.animationActive : styles.animation}></div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
