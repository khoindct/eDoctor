import { forwardRef } from "react";
import { TextField } from "@material-ui/core";
import "./CustomTextField.scss";

interface ICustomTextField {
  label?: string;
  rows?: number;
  placeholder?: string;
  isMultiline?: boolean;
  type?: "text" | "password";
}

const CustomTextField: React.FC<ICustomTextField> = forwardRef(
  ({ label, rows, placeholder, isMultiline, type = "text", ...props }, ref) => {
    return (
      <TextField
        ref={ref as any}
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
            notchedOutline: "form--label-not-touch",
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
  }
);

export default CustomTextField;
