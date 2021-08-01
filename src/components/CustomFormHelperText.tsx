import { FormHelperText } from "@material-ui/core";
import { Message } from "react-hook-form";
import "./CustomFormHelperText.scss";

interface ICustomFormHelperText {
  message: Message | string | undefined;
}

const CustomFormHelperText: React.FC<ICustomFormHelperText> = ({ message }) => {
  return (
    <FormHelperText
      classes={{ root: "custom-form-helper-text" }}
      error
      id="component-error-text"
    >
      {message}
    </FormHelperText>
  );
};

export default CustomFormHelperText;
