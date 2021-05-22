import { Button } from "@material-ui/core";
import "./CustomButton.scss";

interface ICustomButton {
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  callback?: (e: any) => void;
}

const CustomButton: React.FC<ICustomButton> = ({
  className,
  callback,
  children,
  type = "button",
}) => {
  return (
    <Button
      variant="contained"
      type={type}
      className={className}
      classes={{
        contained: "button__contained",
        label: "button__label",
        root: "button__root",
      }}
      onClick={callback}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
