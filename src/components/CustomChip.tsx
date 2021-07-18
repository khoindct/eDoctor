import Chip from "@material-ui/core/Chip";
import "./CustomChip.scss";

interface ICustomChip {
  label: string;
}

const CustomChip: React.FC<ICustomChip> = ({ label }) => {
  return <Chip className="custom-chip" label={label} />;
};

export default CustomChip;
