import styles from "./styles.module.css";
interface ActionCardInterface {
  image: string;
  label: string;
  onClick: () => void;
}

export function ActionCard({ image, label, onClick }: ActionCardInterface) {
  return (
    <div className={styles.actionCardContainer} onClick={onClick}>
      <img className={styles.actionCardIcon} src={image} alt="Icon" />
      <h4 className={styles.actionCardLabel}>{label}</h4>
    </div>
  );
}
