import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useThreatsContext } from '../../service/context';

interface SelectGangProps {
    handleGangChange: (gang: string) => void;
}

const SelectGang: React.FC<SelectGangProps> = ({ handleGangChange }) => {
    const { listOfTypes, fetchListOfType } = useThreatsContext();

    useEffect(() => {
        const fetchData = async () => {
            await fetchListOfType("gang");
        };
        fetchData();
    }, []);

    const onGangChange = (event: SelectChangeEvent<string>) => {
        const gang = event.target.value;
        handleGangChange(gang);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gang</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gang"
                    onChange={onGangChange}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                                maxWidth: 500,
                                overflow: 'auto',
                            },
                        },
                    }}
                >
                    {listOfTypes.map((reg) => (
                            <MenuItem key={reg} value={reg}>{reg}</MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectGang;
