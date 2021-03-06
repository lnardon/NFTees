import { ActionCard } from "../../components/ActionCard";
import styles from "./styles.module.css";

import TransferIcon from "../../assets/transferIcon.png";
import WalletIcon from "../../assets/walletIcon.png";
import EtherscanIcon from "../../assets/etherscan.svg";
import ViewIcon from "../../assets/view.svg";

export function ActionsSection({
  connectMetamask,
  userAddress,
  contract,
  openModal,
}: {
  connectMetamask: () => void;
  userAddress: string;
  contract: string;
  openModal: (index: number) => void;
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>NFTee Actions</h3>
      {userAddress === "" && (
        <button className={styles.connectWalletBtn} onClick={connectMetamask}>
          Connect Metamask
        </button>
      )}
      {userAddress.length > 0 && (
        <div className={styles.actionsDiv + " actionsRef"}>
          <ActionCard
            image={TransferIcon}
            label="Transfer Ownership"
            onClick={() => openModal(0)}
          />
          <ActionCard
            image={WalletIcon}
            label="Get NFTee Owner"
            onClick={() => openModal(1)}
          />
          <ActionCard
            image={EtherscanIcon}
            label="View Contract"
            onClick={() =>
              window.open(
                `https://ropsten.etherscan.io/address/${contract}`,
                "_blank"
              )
            }
          />
          <ActionCard
            image={ViewIcon}
            label="View My NFTee's"
            onClick={() => openModal(2)}
          />
        </div>
      )}
    </div>
  );
}
