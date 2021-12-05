import AnimatedOnView from "../AnimatedOnView";
import { slideUp } from "../../animations/slideUp";
import { slideLeft } from "../../animations/slideLeft";
import logo from "../../assets/logo.svg";

import styles from "./styles.module.css";

export function CollectionSection() {
  return (
    <div className={styles.container}>
      <AnimatedOnView
        index={0}
        variants={slideLeft}
        className={styles.cardContainer}
        renderProps={() => <h3 className={styles.title}>Our Collection</h3>}
      />

      <div className={styles.collectionItems}>
        <AnimatedOnView
          index={0}
          variants={slideUp}
          className={styles.cardContainer}
          renderProps={() => (
            <div>
              <img src={logo} alt="NFT Card" className={styles.image} />
              <button className={styles.cta}>Buy NFT</button>
            </div>
          )}
        />
        <AnimatedOnView
          index={1}
          variants={slideUp}
          className={styles.cardContainer}
          renderProps={() => (
            <div>
              <img src={logo} alt="NFT Card" className={styles.image} />
              <button className={styles.cta}>Buy NFT</button>
            </div>
          )}
        />
        <AnimatedOnView
          index={2}
          variants={slideUp}
          className={styles.cardContainer}
          renderProps={() => (
            <div className={styles.card}>
              <img src={logo} alt="NFT Card" className={styles.image} />
              <button className={styles.cta}>Buy NFT</button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
