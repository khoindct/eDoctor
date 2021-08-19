import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import "./CustomAutoComplete.scss";
import CustomChip from "./CustomChip";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface ICustomAutoComplete {
  options: string[];
  defaultValue?: string[] | undefined;
  label: string;
  placeholder: string;
  handleChange: (data: string[]) => void;
}

const CustomAutoComplete: React.FC<ICustomAutoComplete> = ({
  options,
  defaultValue,
  label,
  placeholder,
  handleChange,
}) => {
  return (
    <Autocomplete
      multiple
      defaultValue={defaultValue}
      limitTags={2}
      id="checkboxes-tags-demo"
      classes={{
        inputRoot: "autocomplete-input-font",
        root: "custom-autocomplete",
      }}
      options={options}
      onChange={(event: any, newValue: string[] | null) => {
        handleChange(newValue!);
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(option, { selected }) => (
        <>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          <span style={{ fontSize: "1.5rem" }}>{option}</span>
        </>
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <CustomChip {...getTagProps({ index })} label={option} />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
