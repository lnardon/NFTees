interface ActionCardInterface {
  image: string;
  label: string;
}

export function ActionCard({ image, label }: ActionCardInterface) {
  return (
    <div>
      <img src={image} alt="Icon" />
      <h4>{label}</h4>
    </div>
  );
}
