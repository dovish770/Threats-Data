import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

type SelectTypeProps = {
  onTypeChange: (type: string) => void;
};

export default function SelectType({ onTypeChange }: SelectTypeProps) {
  const [type, setType] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof type>) => {
    const newType = event.target.value;
    setType(newType);
    onTypeChange(newType);  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
        Select the type of Region you would like to sort by
      </Button>
      <FormControl sx={{ m: 1, minWidth: 120 }} required>
        <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={type}
          label="type"
          onChange={handleChange}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="city">City</MenuItem>
          <MenuItem value="country">Country</MenuItem>
          <MenuItem value="region">Region</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
