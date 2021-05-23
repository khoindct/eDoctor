import { TextField } from "@material-ui/core";
import "./CustomTextField.scss";

interface ICustomTextField {
  label?: string;
  rows?: number;
  placeholder?: string;
  isMultiline?: boolean;
  type?: "text" | "password";
}

const CustomTextField: React.FC<ICustomTextField> = ({
  label,
  rows,
  placeholder,
  isMultiline,
  type = "text",
  ...props
}) => {
  return (
    <TextField
      id="outlined-basic"
      InputLabelProps={{
        classes: {
          root: "form--input",
        },
      }}
      InputProps={{
        classes: {
          input: "form--input",
          root: "form--input-root",
        },
      }}
      type={type}
      label={label}
      multiline={isMultiline}
      rows={rows}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default CustomTextField;
