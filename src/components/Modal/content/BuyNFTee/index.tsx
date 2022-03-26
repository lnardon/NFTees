import closeIcon from "../../../../assets/close.png";
import loadSVG from "../../../../assets/load.svg";
import styles from "./styles.module.css";

interface TransferProps {
  handleClose: () => void;
}

const BuyNFTee = ({ handleClose }: TransferProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.closeDiv}>
        <img
          onClick={handleClose}
          src={closeIcon}
          alt="Close Icon"
          className={styles.closeBtn}
        />
      </div>
      <h1 className={styles.title}>Buy NFTee</h1>
      <img className={styles.loader} src={loadSVG} alt="Loading Spinner" />
      <h2 className={styles.waitMessage}>
        Confirm the transaction on your metamask wallet and leave this window
        open to get notified when the NFTee is minted and the transaction is
        confirmed by the blockchain.
      </h2>
    </div>
  );
};

export default BuyNFTee;
