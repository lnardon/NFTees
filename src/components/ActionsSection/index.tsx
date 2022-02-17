import { ActionCard } from "../../components/ActionCard";

export function ActionsSection({
  connectMetamask,
  userAddress,
}: {
  connectMetamask: () => void;
  userAddress: string;
}) {
  return (
    <div>
      <h3>NFTee Actions</h3>
      {userAddress === "" && (
        <button onClick={connectMetamask}>Connect Metamask</button>
      )}

      {userAddress.length > 0 && (
        <div>
          <ActionCard image="" label="Test" />
        </div>
      )}
    </div>
  );
}
