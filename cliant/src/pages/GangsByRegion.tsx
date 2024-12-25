import SortBar from '../component/gangsByRegion/SortBar';
import GangsTable from '../component/gangsByRegion/Table';
import { useThreatsContext } from '../service/context';
import { Box } from '@mui/material';
import Map from '../component/gangsByRegion/Map';

const GangsByRegion = () => {
  const { gangsByRegion} = useThreatsContext();
  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 0, margin: 0 }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', gap: 2, padding: 0, margin: 0 }}
        >
          <SortBar />
          <Map />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', gap: 2, padding: 0, margin: 0 }}
        >
          <GangsTable data={gangsByRegion} />
        </Box>
      </Box>
    </>
  );
}

export default GangsByRegion;
