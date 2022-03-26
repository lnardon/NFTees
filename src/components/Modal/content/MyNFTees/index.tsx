import { useState, useEffect } from "react";

import closeIcon from "../../../../assets/close.png";
import loadSVG from "../../../../assets/load.svg";
import styles from "./styles.module.css";

interface IMyNFTeesProps {
  handleClose: () => void;
  getNFTeeData: (tokenId: string) => void;
  contractAddress: string;
  account: string;
}

const MyNFTees = ({
  contractAddress,
  account,
  handleClose,
  getNFTeeData,
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
        <div className={styles.nftsContainer}>
          {nftees.length > 0 ? (
            nftees.map((token) => {
              return (
                <div
                  className={styles.nftCard}
                  onClick={() => getNFTeeData(token.tokenID)}
                >
                  <h3 className={styles.cardLabel}>ID#{token.tokenID}</h3>
                </div>
              );
            })
          ) : (
            <h3 className={styles.emptyLabel}>You have 0 NFTees</h3>
          )}
        </div>
      ) : (
        <img className={styles.loader} src={loadSVG} alt="Loading Spinner" />
      )}
    </div>
  );
};

export default MyNFTees;
