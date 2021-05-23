import { Button } from "@material-ui/core";
import "./CustomButton.scss";

interface ICustomButton {
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  variant?: "text" | "outlined" | "contained" | undefined;
  isDisabled?: boolean;
  callback?: () => void;
}

const CustomButton: React.FC<ICustomButton> = ({
  className,
  callback,
  children,
  variant = "contained",
  type = "button",
  isDisabled = false,
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      className={className}
      classes={{
        contained: "button__contained",
        label: "button__label",
        root: "button__root",
      }}
      onClick={callback}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
