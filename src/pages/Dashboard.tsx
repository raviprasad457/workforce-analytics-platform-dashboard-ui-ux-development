import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import DashboardLayout from '../layouts/DashboardLayout';
import KPICards from '../components/KPI/KPICards';
import Filters from '../components/Filters/Filters';
import Charts from '../components/Charts/Charts';
import EmployeeTable from '../components/Table/EmployeeTable';
import RecentActivities from '../components/Activities/RecentActivities';
import { useDashboard } from '../context/DashboardContext';
import { ErrorStateView } from '../components/Common/StateViews';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DownloadIcon from '@mui/icons-material/Download';

export const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { simulationState, refreshData } = useDashboard();

  return (
    <DashboardLayout>
      {/* Page Header / Welcome Hero */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.025em',
                fontSize: { xs: '1.5rem', sm: '1.9rem', md: '2.1rem' },
              }}
            >
              Workforce Intelligence Overview
            </Typography>

            <Chip
              icon={<FiberManualRecordIcon sx={{ fontSize: '10px !important', color: '#10b981 !important' }} />}
              label="Live Telemetry"
              size="small"
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                color: 'success.main',
                fontWeight: 700,
                fontSize: '0.72rem',
                borderRadius: 1.5,
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary">
            Consolidated workforce metrics, attendance patterns, department distributions & real-time activity stream.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AutoGraphIcon />}
            onClick={refreshData}
            sx={{ borderRadius: 2 }}
          >
            Sync Telemetry
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 2 }}
          >
            Executive Summary
          </Button>
        </Box>
      </Box>

      {/* Error state demonstration banner if triggered */}
      {simulationState === 'error' && <ErrorStateView />}

      {/* 1. Five KPI Cards for Workforce and Attendance */}
      <KPICards />

      {/* 2. Global Filters Bar (Date, Department, Location, Status, WorkMode) */}
      <Filters />

      {/* 3. Visual Charts Grid (Attendance Trend + Workforce Donut + Department Distribution) */}
      <Charts />

      {/* 4. Roster Table & Recent Activities Feed */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.8fr 1.2fr' },
          gap: 3,
          mt: 3,
          alignItems: 'start',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <EmployeeTable />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <RecentActivities />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;