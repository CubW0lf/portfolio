import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { GrCheckmark } from "react-icons/gr";
import styles from "../styles/Contact.module.css";
import { useForm } from "react-hook-form";
import { createItem } from "../directus/utils";
import Networks from "../components/Networks/Networks";
import { useUxContext } from "../contexts/uxContext";
import Flash from "../components/Flash/Flash";
import Head from "next/head";

const Contact = () => {
  const { flash, flashType, handleFlash } = useUxContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  const submit = async (data) => {
    await createItem("message", data)
      .then(() => handleFlash("success", "Votre message a bien été envoyé", 3000))
      .catch((err) => handleFlash("error", err, 3000));
  };

  return (
    <>
      <Head>
        <title>Contact | Vincent Cottalorda</title>
        <meta name="description" content="Formulaire de contact, question, devis." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1>Contact</h1>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <h2>Une Question, besoin d&apos;un devis ?</h2>
          <h3>Remplissez ce formulaire et je vous recontacterai au plus vite</h3>
          <div className={styles.formContainer}>
            <div className={styles.column}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Jean"
                  id="first_name"
                  defaultValue=""
                  {...register("first_name", { required: true, minLength: 3, maxLength: 20 })}
                />
                {dirtyFields.first_name && !errors.first_name && <GrCheckmark className={styles.mark} />}
                <label htmlFor="first_name" className={styles.label}>
                  Prénom
                </label>
              </div>
              {errors.first_name?.type === "required" && <p className="error">Le prénom est requis</p>}
              {errors.first_name?.type === "minLength" && (
                <p className="error">Le prénom doit comporter au moins 3 caractères</p>
              )}
              {errors.first_name?.type === "maxLength" && (
                <p className="error">Le prénom doit comporter moins de 20 caractères</p>
              )}
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Dujardin"
                  id="last_name"
                  defaultValue=""
                  {...register("last_name", { required: true, minLength: 3, maxLength: 20 })}
                />
                {dirtyFields.last_name && !errors.last_name && <GrCheckmark className={styles.mark} />}
                <label htmlFor="last_name" className={styles.label}>
                  Nom
                </label>
              </div>
              {errors.last_name?.type === "required" && <p className="error">Le nom de famille est requis</p>}
              {errors.last_name?.type === "minLength" && (
                <p className="error">Le nom de famille doit comporter au moins 3 caractères</p>
              )}
              {errors.last_name?.type === "maxLength" && (
                <p className="error">Le nom de famille doit comporter moins de 20 caractères</p>
              )}
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="email"
                  defaultValue=""
                  {...register("email", {
                    required: true,
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    },
                  })}
                  id="email"
                  className={watch("email") === "" ? "empty" : ""}
                />
                {dirtyFields.email && !errors.email && <GrCheckmark className={styles.mark} />}
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
              </div>
              {errors.email?.type === "pattern" && (
                <p className="error">L&apos;email doit avoir la forme nom@domain.extension</p>
              )}
              {errors.email?.type === "required" && <p className="error">L&apos;email est requis</p>}
              <div className={styles.inputContainer}>
                <select name="pets" id="subject" {...register("subject", { required: true })}>
                  <option value="">--Veuillez choisir une option--</option>
                  <option value="devis">Devis</option>
                  <option value="question">Question</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="autre">Autre</option>
                </select>
                {dirtyFields.subject && !errors.subject && <GrCheckmark className={styles.mark} />}
                <label htmlFor="subject" className={styles.label}>
                  Sujet
                </label>
              </div>
              {errors.subject?.type === "required" && <p className="error">Le sujet est requis</p>}
            </div>

            <div className={styles.column}>
              <div className={styles.inputContainer}>
                <textarea
                  className={styles.textarea}
                  id="message"
                  defaultValue=""
                  {...register("message", { required: true })}
                ></textarea>
                {dirtyFields.message && !errors.message && <GrCheckmark className={styles.markText} />}
                <label htmlFor="message" className={styles.label}>
                  Votre Message
                </label>
              </div>
              {errors.message?.type === "required" && <p className="error">Le message est requis</p>}
            </div>
          </div>
          <Button text="Envoyer" color="var(--grey)" type="submit" className={styles.submit} />
        </form>
        <Networks />
        {flash && <Flash type={flashType} text={flash} />}
      </div>
      <Footer />
    </>
  );
};

export default Contact;
