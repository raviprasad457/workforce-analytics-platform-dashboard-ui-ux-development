import React from 'react';
import { Box, Paper } from '@mui/material';
import { AttendanceTrendChart } from './AttendanceTrendChart';
import { DepartmentDistributionChart } from './DepartmentDistributionChart';
import { WorkforceDonutChart } from './WorkforceDonutChart';
import { useDashboard } from '../../context/DashboardContext';
import { LoadingSkeletonCharts } from '../Common/StateViews';

export const Charts: React.FC = () => {
  const { simulationState } = useDashboard();

  if (simulationState === 'loading') {
    return <LoadingSkeletonCharts />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
      {/* Top Grid: Attendance Trend (2/3) + Workforce Composition Donut (1/3) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.8fr 1.2fr' },
          gap: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            minHeight: 380,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AttendanceTrendChart />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            minHeight: 380,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <WorkforceDonutChart />
        </Paper>
      </Box>

      {/* Bottom Grid: Department-wise Employee Distribution (Full Width) */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          minHeight: 380,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <DepartmentDistributionChart />
      </Paper>
    </Box>
  );
};

export default Charts;