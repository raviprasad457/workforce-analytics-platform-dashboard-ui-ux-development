import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Tooltip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import StarIcon from '@mui/icons-material/Star';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { LoadingSkeletonKPI } from '../Common/StateViews';

const getKPIIcon = (iconName: string) => {
  switch (iconName) {
    case 'PeopleAlt':
      return <PeopleAltIcon fontSize="small" />;
    case 'EventAvailable':
      return <EventAvailableIcon fontSize="small" />;
    case 'AccessTimeFilled':
      return <AccessTimeFilledIcon fontSize="small" />;
    case 'BeachAccess':
      return <BeachAccessIcon fontSize="small" />;
    case 'TrendingUp':
      return <StarIcon fontSize="small" />;
    default:
      return <PeopleAltIcon fontSize="small" />;
  }
};

export const KPICards: React.FC = () => {
  const { kpis, simulationState } = useDashboard();

  if (simulationState === 'loading') {
    return <LoadingSkeletonKPI />;
  }

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
        gap: 2,
      }}
    >
      {kpis.map((kpi) => {
        // Prepare sparkline data formatted for Recharts AreaChart
        const sparklineData = kpi.sparkline.map((val, idx) => ({ idx, val }));

        return (
          <Paper
            key={kpi.id}
            elevation={0}
            sx={{
              p: 2.2,
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 12px 20px -8px rgba(0, 0, 0, 0.5)'
                    : '0 12px 20px -8px rgba(79, 70, 229, 0.12)',
                borderColor: kpi.accentColor,
              },
            }}
          >
            {/* Top accent line */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                bgcolor: kpi.accentColor,
              }}
            />

            {/* Title & Icon Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.72rem',
                  }}
                >
                  {kpi.title}
                </Typography>
                <Tooltip title={`Calculated across enterprise telemetry. ${kpi.subtitle}`} arrow>
                  <InfoOutlinedIcon sx={{ fontSize: 13, color: 'text.secondary', cursor: 'pointer' }} />
                </Tooltip>
              </Box>

              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${kpi.accentColor}18`,
                  color: kpi.accentColor,
                }}
              >
                {getKPIIcon(kpi.icon)}
              </Box>
            </Box>

            {/* Value & Trend Badge */}
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '1.65rem', sm: '1.8rem' },
                  color: 'text.primary',
                  lineHeight: 1.1,
                }}
              >
                {kpi.value}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.8, flexWrap: 'wrap' }}>
                <Chip
                  icon={
                    kpi.isPositive ? (
                      <TrendingUpIcon sx={{ fontSize: '13px !important' }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: '13px !important' }} />
                    )
                  }
                  label={kpi.change}
                  size="small"
                  color={kpi.isPositive ? 'success' : 'error'}
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    px: 0.4,
                  }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
                  {kpi.period}
                </Typography>
              </Box>
            </Box>

            {/* Sparkline Visual Mini-Chart */}
            <Box sx={{ width: '100%', height: 38, my: 0.5 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                  <defs>
                    <linearGradient id={`gradient-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={kpi.accentColor} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={kpi.accentColor} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke={kpi.accentColor}
                    strokeWidth={2}
                    fill={`url(#gradient-${kpi.id})`}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>

            {/* Subtitle description */}
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.72rem',
                pt: 0.8,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {kpi.subtitle}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default KPICards;