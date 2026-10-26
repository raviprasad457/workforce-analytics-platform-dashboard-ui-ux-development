import React, { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  Chip,
} from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  MOCK_ATTENDANCE_TREND_7DAYS,
  MOCK_ATTENDANCE_TREND_30DAYS,
  MOCK_ATTENDANCE_TREND_90DAYS,
} from '../../data/mockData';

// Custom dark/light aware Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    const isDark = theme.palette.mode === 'dark';
    return (
      <Box
        sx={{
          bgcolor: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f8fafc' : '#0f172a',
          p: 1.8,
          borderRadius: 2.5,
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
          minWidth: 180,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, borderBottom: '1px solid', borderColor: 'divider', pb: 0.5 }}>
          {label} Telemetry
        </Typography>
        {payload.map((item: any) => (
          <Box key={item.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.3, gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
              <Typography variant="caption" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                {item.name}:
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {item.value} {item.name === 'rate' ? '%' : 'staff'}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

export const AttendanceTrendChart: React.FC = () => {
  const theme = useTheme();
  const [range, setRange] = useState<'7days' | '30days' | '90days'>('7days');

  const handleRangeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newRange: '7days' | '30days' | '90days' | null
  ) => {
    if (newRange !== null) {
      setRange(newRange);
    }
  };

  const chartData =
    range === '7days'
      ? MOCK_ATTENDANCE_TREND_7DAYS
      : range === '30days'
      ? MOCK_ATTENDANCE_TREND_30DAYS
      : MOCK_ATTENDANCE_TREND_90DAYS;

  const isDark = theme.palette.mode === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chart Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Attendance & Presence Trends
            </Typography>
            <Chip label="94.8% Avg Adherence" size="small" color="success" sx={{ height: 22, fontSize: '0.72rem', fontWeight: 700 }} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Continuous multi-vector monitoring (On-site, Late Check-ins, Remote & Absences)
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={range}
          exclusive
          onChange={handleRangeChange}
          size="small"
          sx={{
            height: 30,
            '& .MuiToggleButton-root': {
              px: 1.5,
              py: 0,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 1.5,
            },
          }}
        >
          <ToggleButton value="7days">7 Days</ToggleButton>
          <ToggleButton value="30days">30 Days</ToggleButton>
          <ToggleButton value="90days">90 Days</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Recharts Area Chart */}
      <Box sx={{ flex: 1, minHeight: 280, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorRemote" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} />
            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 10, fontSize: '0.8rem' }}
            />

            <Area
              type="monotone"
              dataKey="present"
              name="Present (Office)"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorPresent)"
            />
            <Area
              type="monotone"
              dataKey="remote"
              name="Remote (WFH)"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRemote)"
            />
            <Area
              type="monotone"
              dataKey="late"
              name="Late Check-in"
              stroke="#f59e0b"
              strokeWidth={1.8}
              fillOpacity={1}
              fill="url(#colorLate)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
