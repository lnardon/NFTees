import { useState, useEffect } from "react";

import styles from "./styles.module.css";

interface IMyNFTeesProps {
  handleClose: () => void;
  contractAddress: string;
  account: string;
}

const MyNFTees = ({
  contractAddress,
  account,
  handleClose,
}: IMyNFTeesProps) => {
  const [nftees, setNFTees] = useState<INFTee[]>([]);

  async function getMyNFTees() {
    try {
      const response = await fetch(
        `https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${account}&tag=latest&apikey=${process.env.REACT_APP_ETHERSCAN_API}`
      );
      const parsed = await response.json();
      setNFTees(parsed.result);
    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    getMyNFTees();
  }, []);

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
      <h1 className={styles.title}>My NFTees</h1>
      <label htmlFor="tokenId" className={styles.label}>
        Type the NFTee ID:
      </label>
      {nftees &&
        nftees.map((token) => {
          return (
            <label htmlFor="tokenId" className={styles.label}>
              {token.tokenID}
            </label>
          );
        })}
    </div>
  );
};

export default MyNFTees;
