import { useState } from "react";

import styles from "./styles.module.css";

interface TransferProps {
  handleClose: () => void;
  account: string;
  contractInteraction: any;
}

const Transfer = ({
  contractInteraction,
  account,
  handleClose,
}: TransferProps) => {
  const [receivingWallet, setReceivingWallet] = useState("");
  const [tokenId, setTokenId] = useState(0);

  async function handleTransfer(wallet: string, tokenId: number) {
    try {
      let response = await contractInteraction.methods
        .safeTransferFrom(account, wallet, tokenId)
        .send({ from: account, value: 0 });
      alert(response);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.closeDiv}>
        <img
          onClick={handleClose}
          src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
          alt="Close Icon"
          className={styles.closeBtn}
        />
      </div>
      <h1 className={styles.title}>Transfer ownership</h1>
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
        onChange={(e) => setReceivingWallet(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={() => handleTransfer(receivingWallet, tokenId)}
        className={styles.btn}
      >
        Transfer
      </button>
    </div>
  );
};

export default Transfer;
