import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useThreatsContext } from '../../service/context';

interface SelectYearProps {
    handleYearChange: (year: string) => void;
}

const SelectYear: React.FC<SelectYearProps> = ({ handleYearChange }) => {
    const { listOfTypes, fetchListOfType } = useThreatsContext();
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchListOfType("year");
        };
        fetchData();
    }, []);

    const onYearChange = (event: SelectChangeEvent<string>) => {
        const year = event.target.value;
        handleYearChange(year);
    };

    const sortedYears = listOfTypes.sort((a, b) => {
        return parseInt(b) - parseInt(a); 
    });

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">year</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Year"
                    onChange={onYearChange}
                >
                    {sortedYears.map((reg) => (
                        <MenuItem key={reg} value={reg}>{reg}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectYear;
