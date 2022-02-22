import React from "react";

import styles from "./styles.module.css";

const Transfer: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Transfer ownership</h1>
      <label htmlFor="wallet">Paste the wallet to transfer the NFTEE</label>
      <input
        name="wallet"
        type="text"
        placeholder="0x44AfB6114a02D987c252868405fB61488318d282"
      />
      <button onClick={() => console.log("e")}>Transfer</button>
    </div>
  );
};

export default Transfer;
