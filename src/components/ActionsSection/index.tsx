import { ActionCard } from "../../components/ActionCard";
import styles from "./styles.module.css";
import TransferIcon from "../../assets/transferIcon.png";

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
            image={TransferIcon}
            label="Get NFTee Owner"
            onClick={() => alert("In Progress")}
          />
        </div>
      )}
    </div>
  );
}
