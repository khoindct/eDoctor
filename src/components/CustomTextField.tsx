import { forwardRef } from "react";
import { TextField } from "@material-ui/core";
import "./CustomTextField.scss";
import { Message } from "react-hook-form/dist/types";

interface ICustomTextField {
  label?: string;
  rows?: number;
  placeholder?: string;
  isMultiline?: boolean;
  type?: "text" | "password";
  value?: string;
  error?: boolean;
  helperText?: Message | string;
}

const CustomTextField: React.FC<ICustomTextField> = forwardRef(
  (
    {
      label,
      rows,
      placeholder,
      isMultiline,
      type = "text",
      value = "",
      error,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <TextField
        ref={ref as any}
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
        FormHelperTextProps={{
          className: "form--helper-text",
        }}
        error={error}
        helperText={helperText}
        type={type}
        label={label}
        value={value}
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
