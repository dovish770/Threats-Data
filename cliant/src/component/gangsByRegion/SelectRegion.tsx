import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useThreatsContext } from '../../service/context';

interface SelectRegionProps {
    handleRegionChange: (region: string) => void;
}

const SelectRegion: React.FC<SelectRegionProps> = ({ handleRegionChange }) => {
    const { listOfTypes, fetchListOfType } = useThreatsContext();
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchListOfType("region");
        };
        fetchData();
    }, [])
    
    const onRegionChange = (event: SelectChangeEvent<string>) => {
        const region = event.target.value;
        handleRegionChange(region);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Region"
                    onChange={onRegionChange}
                >
                    {listOfTypes.map((reg) => (
                        <MenuItem key={reg} value={reg}>{reg}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectRegion;
