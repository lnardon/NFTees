import { ActionCard } from "../../components/ActionCard";
import styles from "./styles.module.css";

import TransferIcon from "../../assets/transferIcon.png";
import WalletIcon from "../../assets/walletIcon.png";
import ContractIcon from "../../assets/contractIcon.png";

export function ActionsSection({
  connectMetamask,
  userAddress,
}: {
  connectMetamask: () => void;
  userAddress: string;
}) {
  return (
    <div>
      <h3 className={styles.title}>NFTee Actions</h3>
      {userAddress === "" && (
        <button onClick={connectMetamask}>Connect Metamask</button>
      )}

      {userAddress.length > 0 && (
        <div className={styles.actionsDiv}>
          <ActionCard
            image={TransferIcon}
            label="Transfer Ownership"
            onClick={() => alert("In Progress")}
          />
          <ActionCard
            image={WalletIcon}
            label="Get NFTee Owner"
            onClick={() => alert("In Progress")}
          />
          <ActionCard
            image={ContractIcon}
            label="View Contract"
            onClick={() =>
              window.open(
                "https://ropsten.etherscan.io/address/0x44AfB6114a02D987c252868405fB61488318d282",
                "target=_blank"
              )
            }
          />
        </div>
      )}
    </div>
  );
}
