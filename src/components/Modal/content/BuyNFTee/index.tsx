import { useState } from "react";

import closeIcon from "../../../../assets/close.png";
import loadSVG from "../../../../assets/load.svg";
import styles from "./styles.module.css";

interface TransferProps {
  contractInteraction: any;
  handleClose: () => void;
}

const BuyNFTee = ({ contractInteraction, handleClose }: TransferProps) => {
  const [tokenId, setTokenId] = useState(-1);
  const [owner, setOwner] = useState("");
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);

  async function getOwner(tokenId: number) {
    try {
      let response = await contractInteraction.methods.ownerOf(tokenId).call();
      setOwner(response);
    } catch (err: any) {
      alert(err.message);
    }
  }

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
      {waitingConfirmation ? (
        <>
          <img className={styles.loader} src={loadSVG} alt="Loading Spinner" />
          <h2 className={styles.waitMessage}>
            Confirm the transaction on your metamask wallet and leave this
            window open to get notified when the NFTee is minted and the
            transaction is confirmed by the blockchain.
          </h2>
        </>
      ) : (
        <>
          <label htmlFor="tokenId" className={styles.label}>
            Token ID:
          </label>
          <input
            name="tokenId"
            type="number"
            placeholder="NFTee ID"
            onChange={(e) => setTokenId(parseInt(e.target.value))}
            className={styles.input}
          />
          <label htmlFor="wallet" className={styles.label}>
            Receiving address:
          </label>
          <input
            name="wallet"
            type="text"
            placeholder="Receiving address"
            className={styles.input}
          />
          <button className={styles.btn}>Transfer</button>
        </>
      )}
    </div>
  );
};

export default BuyNFTee;
