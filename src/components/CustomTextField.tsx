import { TextField } from "@material-ui/core";
import "./CustomTextField.scss";

interface ICustomTextField {
  label?: string;
  rows?: number;
  placeholder?: string;
  isMultiline?: boolean;
}

const CustomTextField: React.FC<ICustomTextField> = ({
  label,
  rows,
  placeholder,
  isMultiline,
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
