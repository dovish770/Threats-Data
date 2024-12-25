import SortBar from '../component/incidentsBtYearOrGang/SortBar';
import IncidentsTable from '../component/incidentsBtYearOrGang/Table';
import Loading from '../component/Loading';
import { useThreatsContext } from '../service/context';
import { Box } from '@mui/material';  

const IncidentsByYearOrGang = () => {
  const { incidentsByYearOrGang, loading } = useThreatsContext();

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999,
          }}
        >
          <Loading />
        </Box>
      )}
      <SortBar />
      <Box marginBottom={3} />
      <IncidentsTable data={incidentsByYearOrGang} />
    </>
  );
}

export default IncidentsByYearOrGang;
