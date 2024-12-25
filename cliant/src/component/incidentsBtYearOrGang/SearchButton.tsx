import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { useThreatsContext } from '../../service/context';

type SearchButtonProps = {
  onClick: () => Promise<void>; 
};

export default function SearchButton({ onClick }: SearchButtonProps) {
    const { loading, setLoading } = useThreatsContext(); 

    const handleClick = async () => {
        setLoading(true);  
        try {
            await onClick(); 
        } catch (error) {
            console.error('Error during sorting:', error);
        } finally {
            setLoading(false);  
        }
    };

    return (
        <Stack spacing={2} direction="row">
            <LoadingButton
                onClick={handleClick}
                loading={loading} 
                variant="contained"
            >
                {loading ? 'Sorting...' : 'Search'}
            </LoadingButton>
        </Stack>
    );
}
