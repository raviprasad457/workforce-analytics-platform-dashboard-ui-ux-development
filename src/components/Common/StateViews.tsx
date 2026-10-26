import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Skeleton,
  Alert,
  AlertTitle,
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useDashboard } from '../../context/DashboardContext';

export const LoadingSkeletonKPI: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: 2.5,
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <Paper
          key={item}
          sx={{
            p: 2.5,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="circular" width={38} height={38} />
          </Box>
          <Skeleton variant="text" width="80%" height={44} />
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Skeleton variant="rounded" width={60} height={22} />
            <Skeleton variant="text" width="45%" height={20} />
          </Box>
          <Skeleton variant="rectangular" width="100%" height={32} sx={{ borderRadius: 1.5 }} />
        </Paper>
      ))}
    </Box>
  );
};

export const LoadingSkeletonCharts: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: 3,
        mt: 3,
      }}
    >
      <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton variant="text" width={220} height={32} />
          <Skeleton variant="rounded" width={180} height={32} />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
      </Paper>
      <Paper sx={{ p: 3, borderRadius: 3, height: 400 }}>
        <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
        <Skeleton variant="circular" width={220} height={220} sx={{ mx: 'auto', my: 2 }} />
        <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto' }} />
      </Paper>
    </Box>
  );
};

export const ErrorStateView: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = 'Unable to synchronize real-time workforce metrics from the primary gateway.',
  onRetry,
}) => {
  const { setSimulationState, refreshData } = useDashboard();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      setSimulationState('loading');
      refreshData();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        my: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'error.light',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(254, 242, 242, 0.9)',
      }}
    >
      <Alert
        severity="error"
        icon={<ErrorIcon fontSize="large" />}
        action={
          <Button
            color="error"
            variant="contained"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={handleRetry}
            sx={{ fontWeight: 600, mt: { xs: 1, sm: 0 } }}
          >
            Retry Connection
          </Button>
        }
        sx={{
          bgcolor: 'transparent',
          p: 0,
          alignItems: 'center',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        <AlertTitle sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
          Data Synchronization Error (Status: 503 Service Unavailable)
        </AlertTitle>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {message} Our automated health probe is monitoring the endpoint. You can initiate a manual retry.
        </Typography>
      </Alert>
    </Paper>
  );
};

export const EmptyStateView: React.FC<{
  title?: string;
  description?: string;
  onReset?: () => void;
}> = ({
  title = 'No Matching Employee Records Found',
  description = 'None of the active team members meet the selected combination of department, location, status, or search query.',
  onReset,
}) => {
  const { resetFilters, setSimulationState } = useDashboard();

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      resetFilters();
      setSimulationState('normal');
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        py: 8,
        px: 3,
        my: 3,
        textAlign: 'center',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : '#f8fafc',
        border: '1px dashed',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main',
          mb: 2,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 40 }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 460, mb: 3 }}
      >
        {description}
      </Typography>

      <Button
        variant="contained"
        startIcon={<FilterAltOffIcon />}
        onClick={handleReset}
        sx={{ px: 3, py: 1, borderRadius: 2 }}
      >
        Reset All Filters
      </Button>
    </Paper>
  );
};
