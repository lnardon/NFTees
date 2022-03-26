import AnimatedOnView from "../AnimatedOnView";
import { slideUp } from "../../animations/slideUp.js";
import { slideLeft } from "../../animations/slideLeft.js";

import SplashIllustration from "../../assets/optimized_images/splash.webp";
import "./styles.css";

interface PropsInterface {
  scrollToSection: () => void;
}

export const SplashSection = ({ scrollToSection }: PropsInterface) => {
  return (
    <div className="container">
      <div className="left">
        <AnimatedOnView
          renderProps={() => <h1 className="title">NFTee's</h1>}
          index={0}
          className="test"
          variants={slideLeft}
        />
        <AnimatedOnView
          renderProps={() => (
            <h2 className="subtitle">
              Get your unique NFTee from our collection on the Ethereum Ropsten
              Test Network.
            </h2>
          )}
          index={0}
          className="test"
          variants={slideLeft}
        />
        <AnimatedOnView
          renderProps={() => (
            <button className="cta" onClick={scrollToSection}>
              Get NFTee
            </button>
          )}
          index={0}
          className="test"
          variants={slideUp}
        />
      </div>
      <div className="right">
        <AnimatedOnView
          renderProps={() => (
            <img
              className="splashIllustration"
              src={SplashIllustration}
              alt="Illustration"
            />
          )}
          index={0}
          className="test1"
          variants={slideUp}
        />
      </div>
    </div>
  );
};
