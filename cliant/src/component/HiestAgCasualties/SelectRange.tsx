// SelectRange
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type SelectRangeProps = {
  onFilterChange: (filter: string) => void;
};

export default function SelectRange({ onFilterChange }: SelectRangeProps) {
  const [value, setValue] = React.useState('highest');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
    onFilterChange(newValue);  
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Filter</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="highest" control={<Radio />} label="Highest" />
        <FormControlLabel value="all" control={<Radio />} label="All" />
      </RadioGroup>
    </FormControl>
  );
}
