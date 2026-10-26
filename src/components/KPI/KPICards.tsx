import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Tooltip,
  useTheme,
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
  const theme = useTheme();
  const { kpis, simulationState, handleNavigate } = useDashboard();
  const isDark = theme.palette.mode === 'dark';

  if (simulationState === 'loading') {
    return <LoadingSkeletonKPI />;
  }

  return (
    <Box
      id="kpi-cards-section"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: 2.2,
      }}
    >
      {kpis.map((kpi) => {
        const sparklineData = kpi.sparkline.map((val, idx) => ({ idx, val }));

        return (
          <Paper
            key={kpi.id}
            elevation={0}
            onClick={() => {
              if (kpi.metricType === 'attendance') handleNavigate('attendance');
              else if (kpi.metricType === 'workforce') handleNavigate('workforce');
              else if (kpi.metricType === 'leave') handleNavigate('leaves');
            }}
            sx={{
              p: 2.4,
              borderRadius: 3.5,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: isDark
                ? `linear-gradient(145deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%)`
                : `linear-gradient(145deg, #ffffff 0%, ${kpi.accentColor}08 100%)`,
              transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid',
              borderColor: isDark ? `${kpi.accentColor}30` : `${kpi.accentColor}25`,
              boxShadow: isDark
                ? `0 4px 20px -5px ${kpi.accentColor}20`
                : `0 4px 20px -5px ${kpi.accentColor}15`,
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: kpi.accentColor,
                boxShadow: `0 12px 28px -6px ${kpi.accentColor}35`,
              },
            }}
          >
            {/* Top Glowing Color Accent Bar */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${kpi.accentColor} 0%, ${kpi.accentColor}88 100%)`,
                boxShadow: `0 0 10px ${kpi.accentColor}`,
              }}
            />

            {/* Title & Glowing Icon Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
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
                  width: 36,
                  height: 36,
                  borderRadius: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${kpi.accentColor}25 0%, ${kpi.accentColor}10 100%)`,
                  color: kpi.accentColor,
                  border: `1px solid ${kpi.accentColor}35`,
                  boxShadow: `0 4px 10px ${kpi.accentColor}20`,
                }}
              >
                {getKPIIcon(kpi.icon)}
              </Box>
            </Box>

            {/* Value & Colorful Trend Badge */}
            <Box sx={{ mb: 1.2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  fontSize: { xs: '1.75rem', sm: '1.95rem' },
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
                    height: 22,
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    px: 0.4,
                    boxShadow: kpi.isPositive
                      ? '0 2px 8px rgba(16, 185, 129, 0.25)'
                      : '0 2px 8px rgba(239, 68, 68, 0.25)',
                  }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem', fontWeight: 600 }}>
                  {kpi.period}
                </Typography>
              </Box>
            </Box>

            {/* Sparkline Visual Mini-Chart */}
            <Box sx={{ width: '100%', height: 42, my: 0.5 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                  <defs>
                    <linearGradient id={`gradient-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={kpi.accentColor} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={kpi.accentColor} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke={kpi.accentColor}
                    strokeWidth={2.5}
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
                fontSize: '0.73rem',
                pt: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 500,
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