import AnimatedOnView from "../AnimatedOnView";
import { slideUp } from "../../animations/slideUp.js";
import { slideLeft } from "../../animations/slideLeft.js";

import logo from "../../assets/logo.svg";
import "./styles.css";

export const SplashSection = () => {
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
              Get your free and unique NFTee NFT for the Ethereum Ropsten
              Network.
            </h2>
          )}
          index={0}
          className="test"
          variants={slideLeft}
        />
        <AnimatedOnView
          renderProps={() => (
            <button
              className="cta"
              onClick={() => alert("TODO: Scroll to NFT minter section.")}
            >
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
          renderProps={() => <img className="logo" src={logo} alt="Logo" />}
          index={0}
          className="test1"
          variants={slideUp}
        />
      </div>
    </div>
  );
};
