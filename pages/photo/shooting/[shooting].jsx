import styles from "../../../styles/Shooting.module.css";
import { getAll, find } from "../../../directus/utils";
import Image from "next/image";
import getAssetURL from "../../../directus/getAssets";
import { MdOutlineArrowBack, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { useUxContext } from "../../../contexts/uxContext";
import Head from "next/head";
import { Dialog } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const Shooting = ({ shooting }) => {
  dayjs.locale("fr");
  const { handleRedirect } = useUxContext();

  const [toggleModal, setToggleModal] = useState(false);
  const [images, setImages] = useState(null);
  const [image, setImage] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const backdrop = useRef();

  useEffect(() => {
    if (images !== null) {
      setImage(images[currentImage].directus_files_id);
    }
  }, [currentImage, images]);

  useEffect(() => {
    setImages(shooting.photos);
  }, [shooting.photos]);

  const handleClick = (image, id) => {
    setImage(image);
    setCurrentImage(id);
    setToggleModal(true);
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleNext = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  return (
    shooting && (
      <>
        <Head>
          <title>{`${shooting.name} | Vincent Cottalorda`}</title>
          <meta name="description" content={`Présentation du shooting ${shooting.name}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Dialog open={toggleModal} onClose={() => setToggleModal(false)} initialFocus={backdrop}>
          <div className={styles.modal}>
            <GrClose className={styles.close} onClick={() => setToggleModal(false)} />
            {currentImage !== 0 && <MdOutlineArrowBackIosNew className={styles.prev} onClick={handlePrev} />}
            {images && currentImage < images.length - 1 && (
              <MdOutlineArrowForwardIos className={styles.next} onClick={handleNext} />
            )}
            <Image src={getAssetURL(image)} alt="" layout="fill" objectFit="contain" />
          </div>
          <Dialog.Overlay ref={backdrop} className={styles.backdrop} onClick={() => setToggleModal(false)}></Dialog.Overlay>
        </Dialog>
        <article className={styles.container}>
          <div className={styles.back} onClick={handleRedirect}>
            <MdOutlineArrowBack />
          </div>
          <header className={styles.header}>
            <h1>{shooting.name}</h1>
            <h2>{dayjs(shooting.shooted_at).format("DD MMMM YYYY")}</h2>
            <div className={styles.fimgContainer}>
              <div className={styles.fimgRelative}>
                <Image src={getAssetURL(shooting.fimg.id)} alt="" layout="fill" objectFit="contain" />
              </div>
            </div>
          </header>
          <hr />
          <div className={styles.tags}>
            {shooting.tags.map((t, index) => (
              <span className={styles.tag} key={index}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.photoGrid}>
            {images &&
              images.map((p, index) => (
                <div className={styles.photoContainer} onClick={() => handleClick(p.directus_files_id, index)} key={p.id}>
                  <Image src={getAssetURL(p.directus_files_id)} alt="" layout="fill" objectFit="cover" />
                </div>
              ))}
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: shooting.description }} className={styles.body}></div> */}
        </article>
      </>
    )
  );
};

export async function getStaticPaths() {
  const shootings = await getAll("shooting");

  const paths = shootings.map((item) => ({
    params: { shooting: item.id.toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const id = context.params.shooting;
  const shooting = await find("shooting", id);
  return {
    props: {
      shooting,
    },
    revalidate: 30,
  };
}

export default Shooting;
