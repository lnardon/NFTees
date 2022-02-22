import AnimatedOnView from "../AnimatedOnView";
import { slideUp } from "../../animations/slideUp";
import { slideLeft } from "../../animations/slideLeft";

import Founders from "../../assets/fe.png";
import Standard from "../../assets/st.png";
import Pink from "../../assets/pe.png";
import styles from "./styles.module.css";

interface PropsInterface {
  getStandardEditionNFT: () => void;
  getPinkEditionNFT: () => void;
  getFoundersNFT: () => void;
}

export function CollectionSection({
  getStandardEditionNFT,
  getPinkEditionNFT,
  getFoundersNFT,
}: PropsInterface) {
  return (
    <div className={styles.container}>
      <AnimatedOnView
        index={0}
        variants={slideLeft}
        className={styles.cardContainer}
        renderProps={() => <h3 className={styles.title}>Collection</h3>}
      />

      <div className={styles.collectionItems + " collectionRef"}>
        <AnimatedOnView
          index={0}
          variants={slideUp}
          className={styles.cardContainer}
          renderProps={() => (
            <div className={styles.card}>
              <img
                src={Standard}
                alt="Standard NFT Card"
                className={styles.image}
              />
              <button className={styles.cta} onClick={getStandardEditionNFT}>
                Get Standard NFT
              </button>
            </div>
          )}
        />
        <AnimatedOnView
          index={1}
          variants={slideUp}
          className={styles.cardContainer}
          renderProps={() => (
            <div className={styles.card}>
              <img
                src={Pink}
                alt="Pink Edition NFT Card"
                className={styles.image}
              />
              <button className={styles.cta} onClick={getPinkEditionNFT}>
                Buy Pink NFT
              </button>
            </div>
          )}
        />
        <AnimatedOnView
          index={2}
          variants={slideUp}
          className={styles.cardContainer}
          renderProps={() => (
            <div className={styles.card}>
              <img
                src={Founders}
                alt="Founders NFT Card"
                className={styles.image}
              />
              <button className={styles.cta} onClick={getFoundersNFT}>
                Buy Founders NFT
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
