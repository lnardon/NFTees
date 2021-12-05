import logo from "../../assets/logo.svg";
import "./styles.css";

export const SplashSection = () => {
  return (
    <div className="container">
      <div className="left">
        <h1 className="title">NFTee's</h1>
        <h2 className="subtitle">
          Get your free and unique NFTee NFT for the Ethereum Ropsten Network.
        </h2>
        <button
          className="cta"
          onClick={() => alert("TODO: Scroll to NFT minter section.")}
        >
          Get NFTee
        </button>
      </div>
      <div className="right">
        <img className="logo" src={logo} alt="Logo" />
      </div>
    </div>
  );
};
