import { useState, useEffect } from "react";

import closeIcon from "../../../../assets/close.png";
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
  const [nftees, setNFTees] = useState<any[] | null>(null);

  async function getUserNFTs() {
    try {
      const response = await fetch(
        `https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${account}&apikey=${process.env.REACT_APP_ETHERSCAN_API}`
      );
      const parsed = await response.json();
      let ownedNFTs: any[] = [];
      parsed.result.forEach((tx: any) => {
        if (tx.to.toLowerCase() === account.toLowerCase()) {
          ownedNFTs.push(tx);
        } else if (tx.from.toLowerCase() === account.toLowerCase()) {
          ownedNFTs = ownedNFTs.filter((nft) => nft.tokenID !== tx.tokenID);
        }
      });
      setNFTees(ownedNFTs);
    } catch (err: any) {
      alert(err.message);
    }
  }

  useEffect(() => {
    getUserNFTs();
  }, []);

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
      <h1 className={styles.title}>My NFTees</h1>
      {nftees ? (
        nftees.map((token) => {
          return (
            <label htmlFor="tokenId" className={styles.label}>
              {token.tokenID}
            </label>
          );
        })
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};

export default MyNFTees;
