import React, { useState } from 'react';
import SortButton from '../HiestAgCasualties/SortButton';
import { useThreatsContext } from '../../service/context';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const SortBar = () => {
    const { fetchIncidentsTrends, setError } = useThreatsContext();
    const [range, setRange] = useState<number>(1);
    const [startYear, setStartYear] = useState<number>(1970);
    const [endYear, setEndYear] = useState<number>(1971);
    const [endYearError, setEndYearError] = useState<string | null>(null);

    const handleRangeChange = (e: any) => {
        const newRange = e.target.value;
        setRange(newRange);
        
        if (newRange === 1) {
            setEndYear(startYear);
        }
    };

    const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1970 && value <= 2023) {
            setStartYear(value);
            if (range === 1) {
                setEndYear(value);
            }
            else if(range===5){
                setStartYear(2012)
                setEndYear(2017)
            }
            else if(range===10){
                setStartYear(2007)
                setEndYear(2017)
            }
        }
    };

    const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        
        if (value >= 1970 && value <= 2017) {
            setEndYear(value);
            setEndYearError(null); 
        } else {
            setEndYearError('Year must be between 1970 and 2017');
        }

        if (value < startYear) {
            setEndYearError("Can't be earlier than start year");
        }
    };

    const handleSortClick = async () => {
        const rangeMapping: Record<number, [string, string]> = {
            1: [startYear.toString(), ''],         
            5: ['2013', '2017'],                  
            10: ['2008', '2017'],                 
            0: [startYear.toString(), endYear.toString()], 
        };
        const [start, end] = rangeMapping[range] || [startYear.toString(), '']; 
        await fetchIncidentsTrends(start, end);
    };
    
    return (
        <div>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding={2}
                bgcolor="background.paper"
                boxShadow={3}
            >
                <SortButton onClick={handleSortClick} />
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose Range</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={range}
                            label="Range"
                            onChange={handleRangeChange}
                        >
                            <MenuItem value={0}>Manual Select</MenuItem>
                            <MenuItem value={1}>1 year</MenuItem>
                            <MenuItem value={5}>Last 5 years</MenuItem>
                            <MenuItem value={10}>Last 10 years</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    id="outlined-number"
                    label="Start-Year"
                    type="number"
                    value={startYear}
                    onChange={handleStartYearChange}
                    inputProps={{
                        min: 1970,
                        max: 2017,
                    }}
                    helperText={startYear < 1970 || startYear > 2017 ? 'Year must be between 1970 and 2017' : ''}
                    error={startYear < 1970 || startYear > 2017}
                    disabled={range > 1} 
                />
                <TextField
                    id="outlined-number"
                    label="End-Year"
                    type="number"
                    value={endYear}
                    onChange={handleEndYearChange}
                    inputProps={{
                        min: 1970,
                        max: 2017,
                    }}
                    helperText={endYearError || (endYear < 1970 || endYear > 2017 ? 'Year must be between 1970 and 2017' : '')}
                    error={!!endYearError || endYear < 1970 || endYear > 2017}
                    disabled={range !== 0} 
                />
                
            </Box>
        </div>
    );
};

export default SortBar;
