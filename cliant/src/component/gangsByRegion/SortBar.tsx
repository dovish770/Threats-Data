import { useThreatsContext } from '../../service/context';
import { Box } from '@mui/material';
import { useState } from 'react';
import SelectRegion from './SelectRegion';
import RadioTop from './RadioTop';
import SortButton from './SortButton';

const SortBar = () => {
    const { fetchGangsByRegion, setError, } = useThreatsContext();
    const [region, setRegion] = useState<string>('');
    const [top, setTop] = useState<string>('0');

    const handleRegionChange = (region: string) => {
        setRegion(region);
        if (setError) setError('');
    };

    const handleTopChange = (isTop: boolean) => {
        isTop ? setTop('5') : setTop('0')
        if (setError) setError('');
    };

    const handleSortClick = async () => {
        if (!region) {
            if (setError) setError('Please select a region before sorting.');
            setTimeout(() => {
                setError('');
            }, 3000);
            return;
        }
        await fetchGangsByRegion(region, top);
    };

    return (
        <div>
            <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}  
                alignItems="center"
                padding={{ xs: 2, sm: 5 }}  
                gap={3}
                justifyContent="space-around"
                bgcolor="background.paper"
                boxShadow={3}
            >
                <SelectRegion handleRegionChange={handleRegionChange} />
                <RadioTop handleTopChange={handleTopChange} />
                <SortButton onClick={handleSortClick} />
            </Box>

        </div>
    );
};

export default SortBar;

