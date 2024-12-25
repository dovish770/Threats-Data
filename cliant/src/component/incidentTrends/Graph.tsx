import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { Dataset } from '../../types/serviceTypes';

const chartSetting = {
  yAxis: [{ label: 'Incidents Count' }],
  height: 300,
};

interface GraphProps {
  dataset: Dataset[];
}

const Graph: React.FC<GraphProps> = ({ dataset }) => {
  const filteredDataset = dataset.filter(
    (data) => data && data.incidents !== undefined && data.period && data.incidents > 10
  );

  const formattedDataset = filteredDataset.map((item) => ({
    period: item.period,
    incidents: item.incidents,
  }));

  return (
    <BarChart
      dataset={formattedDataset}
      xAxis={[{ scaleType: 'band', dataKey: 'period' }]}
      series={[
        {
          dataKey: 'incidents',
          label: 'Incident Count',
          valueFormatter: (value) => {
            if (value == null) {
              return '0';
            }
            return value.toLocaleString();
          },
        },
      ]}
      grid={{ horizontal: true }}
      sx={{
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translateX(-10px)',
          paddingRight: '10px',  
        },
        [`& .${chartsGridClasses.line}`]: {
          strokeDasharray: '5 3',
          strokeWidth: 2,
        },
      }}
      {...chartSetting}
    />
  );
}

export default Graph;
