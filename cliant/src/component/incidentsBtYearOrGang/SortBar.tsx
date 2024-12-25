import React, { useState } from 'react';
import { useThreatsContext } from '../../service/context';
import { Box, Button } from '@mui/material';
import SelectYear from './SelectYear';
import SelectGang from './SelectGang';
import SearchButton from './SearchButton';

const SortBar = () => {
    const { fetchGroupByYearOrGang, setError } = useThreatsContext();
    const [year, setYear] = useState<string>('');
    const [gang, setGang] = useState<string>('');
    const [isYearSearch, setIsYearSearch] = useState<boolean>(true);  

    const handleSearchClick = async () => {
        if (!year && isYearSearch ) {
            setError('Please select a year before sorting.');
            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }
        if (!gang && !isYearSearch) {
            setError('Please select a gang before sorting.');
            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }

        if (isYearSearch) {
            await fetchGroupByYearOrGang(year, undefined);
        } else {
            await fetchGroupByYearOrGang(undefined, gang);
        }
    };

    const handleYearChange = (year: string) => {
        setYear(year);
    };

    const handleGangChange = (gang: string) => {
        setGang(gang);
    };

    const toggleSearchType = () => {
        setIsYearSearch(!isYearSearch); 
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
                <Button variant="outlined" onClick={toggleSearchType}>
                    {isYearSearch ? 'Search by Gang' : 'Search by Year'}
                </Button>

                {isYearSearch ? (
                    <SelectYear handleYearChange={handleYearChange} />
                ) : (
                    <SelectGang handleGangChange={handleGangChange} />
                )}

                <SearchButton onClick={handleSearchClick}/>
            </Box>

            
        </div>
    );
};

export default SortBar;
