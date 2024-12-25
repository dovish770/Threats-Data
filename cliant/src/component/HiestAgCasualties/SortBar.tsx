import { useState } from 'react';
import SelectType from './SelectType';
import SelectRange from './SelectRange';
import SortButton from './SortButton';
import { useThreatsContext } from '../../service/context';
import { Box } from '@mui/material';

const SortBar = () => {
  const { fetchHighestAvgCasualties, setError } = useThreatsContext(); 
  const [type, setType] = useState<string>('');
  const [filter, setFilter] = useState<string>('highest');

  const handleTypeChange = (newType: string) => {
    setType(newType);
    if (setError) setError('');  
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSortClick = async () => {
    if (!type) {
      setError('Please select a type before sorting.');  
      
      setTimeout(() => {
        setError('');  
      }, 3000);  
      return;
    }
    await fetchHighestAvgCasualties(type, filter === 'highest' ? "false" : "true");
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
      <SelectType onTypeChange={handleTypeChange} />
      <SelectRange onFilterChange={handleFilterChange} />
      <SortButton onClick={handleSortClick} />
    </Box>
    </div>
  );
};

export default SortBar;

