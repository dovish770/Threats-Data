import * as React from 'react';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

interface RadioTopProps{
    handleTopChange: (top: boolean) => void;
}

const RadioTop:React.FC<RadioTopProps> = ({handleTopChange}) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleTopChange(checked)
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={checked ? 'All Gangs' : 'Top 5'} 
    />
  );
};

export default RadioTop

