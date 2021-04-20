import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface ExternalViewSwitcherProp {
  currentViewName: any;
  onChange: any;
}

const ExternalViewSwitcher: React.FC<ExternalViewSwitcherProp> = ({
  currentViewName,
  onChange,
}) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: 'row' }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Week" control={<Radio />} label="Week" />
    <FormControlLabel value="Month" control={<Radio />} label="Month" />
  </RadioGroup>
);

export default ExternalViewSwitcher;
