import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useThreatsContext } from '../service/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DeadliestAttackTypes from './DeadliestAttackTypes';
import CasualtiesByRegion from './CasualtiesByRegion';
import Dashboard from './Dashboard';
import { IncidentsTrends } from './IncidentsTrends';
import GangsByRegion from './GangsByRegion';
import IncidentsByYearOrGang from './IncidentsByYearOrGang';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard - Threats',
    icon: <DashboardIcon />,
  },
  {
    segment: 'DeadliestAttackTypes',
    title: 'Deadliest Attack Types',
    icon: <BarChartIcon />,
  },
  {
    segment: 'CasualtiesByRegion',
    title: 'Casualties By Region',
    icon: <BarChartIcon />,
  },
  {
    segment: 'IncidentsTrends',
    title: 'Incidents Trends',
    icon: <BarChartIcon />,
  },
  {
    segment: 'GangsByRegion', 
    title: 'Gangs By Region',
    icon: <BarChartIcon />,
  },
  {
    segment: 'IncidentsByYearOrGang', 
    title: 'Incidents By Year Or Gang',
    icon: <BarChartIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function HomePage(props: any) {
  const { error } = useThreatsContext();
  const { window } = props;
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      branding={{ title: 'Threats-Monitor' }}
      navigation={NAVIGATION}
      theme={demoTheme}
      window={demoWindow}
    >
      {error && (
        <Stack
          sx={{
            position: 'fixed',  
            top: 20,          
            left: '50%',        
            transform: 'translateX(-50%)',  
            width: 'auto',     
            zIndex: 20000,       
          }}
          spacing={2}
        >
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      <DashboardLayout>
        <PageContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/DeadliestAttackTypes" element={<DeadliestAttackTypes />} />
              <Route path="/CasualtiesByRegion" element={<CasualtiesByRegion />} />
              <Route path="/IncidentsTrends" element={<IncidentsTrends />} />
              <Route path="/GangsByRegion" element={<GangsByRegion />} />
              <Route path="/IncidentsByYearOrGang" element={<IncidentsByYearOrGang />} />
            </Routes>
          </BrowserRouter>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
