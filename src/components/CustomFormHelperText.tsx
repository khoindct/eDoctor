import { FormHelperText } from "@material-ui/core";
import { Message } from "react-hook-form";

interface ICustomFormHelperText {
  message: Message | string | undefined;
}

const CustomFormHelperText: React.FC<ICustomFormHelperText> = ({ message }) => {
  return <FormHelperText id="component-error-text">{message}</FormHelperText>;
};

export default CustomFormHelperText;
