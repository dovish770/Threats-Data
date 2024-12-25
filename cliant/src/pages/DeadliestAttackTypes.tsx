import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect } from "react";
import { useThreatsContext } from "../service/context";
import Loading from '../component/Loading';
import { Box } from '@mui/material';

export default function DeadliestAttackTypes() {
  const { mostDeadliest, loading, error, fetchMostDeadliest } = useThreatsContext();

  useEffect(() => {
    fetchMostDeadliest();
  }, []);

  if (loading) return <Box
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
  </Box>;
  if (error) return <div>Error: {error}</div>;

  const chartData = mostDeadliest.map((item, idx) => ({
    id: idx,
    value: item.casualties,
    label: item._id,
  }));

  return (
    <>
      <h1>Casualties Per Type Of Attack</h1>
      <PieChart
        series={[{ data: chartData }]}
        width={700}
        height={700}
      />
    </>
  );
}
