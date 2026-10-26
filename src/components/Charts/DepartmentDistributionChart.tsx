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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MOCK_DEPARTMENT_METRICS } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';

const CustomBarTooltip = ({ active, payload, label }: any) => {
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
          minWidth: 190,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, borderBottom: '1px solid', borderColor: 'divider', pb: 0.5 }}>
          {label} Department
        </Typography>
        {payload.map((item: any) => (
          <Box key={item.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.3, gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.fill || item.color }} />
              <Typography variant="caption" sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                {item.name}:
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {item.value} {item.unit || (item.name === 'attendanceRate' ? '%' : 'staff')}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

export const DepartmentDistributionChart: React.FC = () => {
  const theme = useTheme();
  const { filters, setFilter } = useDashboard();
  const [metricMode, setMetricMode] = useState<'headcount' | 'rates'>('headcount');

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'headcount' | 'rates' | null
  ) => {
    if (newMode !== null) {
      setMetricMode(newMode);
    }
  };

  const isDark = theme.palette.mode === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Department-Wise Distribution
            </Typography>
            <Chip
              label="7 Divisions"
              size="small"
              color="primary"
              sx={{ height: 22, fontSize: '0.72rem', fontWeight: 700 }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Comparative headcount, present ratio, and remote workforce allocation
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={metricMode}
          exclusive
          onChange={handleModeChange}
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
          <ToggleButton value="headcount">Headcount</ToggleButton>
          <ToggleButton value="rates">Attendance %</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Bar Chart */}
      <Box sx={{ flex: 1, minHeight: 280, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {metricMode === 'headcount' ? (
            <BarChart
              data={MOCK_DEPARTMENT_METRICS}
              margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              onClick={(e) => {
                if (e && e.activeLabel) {
                  const labelStr = String(e.activeLabel);
                  setFilter('department', labelStr === filters.department ? '' : labelStr);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="department"
                stroke={textColor}
                fontSize={11}
                tickLine={false}
                angle={-15}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: 10, fontSize: '0.8rem' }}
              />

              <Bar
                dataKey="present"
                name="Present On-Site"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
                barSize={18}
              />
              <Bar
                dataKey="remote"
                name="Remote / WFH"
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
                barSize={18}
              />
              <Bar
                dataKey="onLeave"
                name="On Leave"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                barSize={18}
              />
            </BarChart>
          ) : (
            <BarChart
              data={MOCK_DEPARTMENT_METRICS}
              margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="department"
                stroke={textColor}
                fontSize={11}
                tickLine={false}
                angle={-15}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke={textColor} fontSize={12} domain={[85, 100]} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="attendanceRate"
                name="Attendance Rate (%)"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
