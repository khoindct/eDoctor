import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
} from "@material-ui/core";
import "./CustomSelect.scss";

interface ICustomSelect {
  items: string[];
  onItemChange: any;
}

const CustomSelect: React.FC<ICustomSelect> = ({ items, onItemChange }) => {
  const [value, setValue] = useState([]);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const handleChange = (event: any) => {
    setValue(event.target.value);
    onItemChange(event.target.value);
  };
  const handleDelete = (data: any) => {
    setValue((prevState) => prevState.filter((item) => item !== data));
    setIsSelectDisabled(false);
  };
  const handleMouseOver = () => {
    setIsSelectDisabled(true);
  };
  const handleMouseLeave = () => {
    setIsSelectDisabled(false);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Symptom(s)</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={value}
        disabled={isSelectDisabled}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected: any) => (
          <div className="chips">
            {selected.map((value: any) => (
              <Chip
                key={value}
                label={value}
                className="chip"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onDelete={() => handleDelete(value)}
              />
            ))}
          </div>
        )}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item} classes={{ root: "menu-item" }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
