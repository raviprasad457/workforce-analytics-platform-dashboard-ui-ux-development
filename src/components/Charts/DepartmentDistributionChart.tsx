import React, { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  Chip,
  Button,
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
  Cell,
  ReferenceLine,
} from 'recharts';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
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
          minWidth: 200,
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
              {item.value} {item.unit || (item.dataKey === 'attendanceRate' ? '%' : 'staff')}
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
  const { filters, setFilter, simulationState } = useDashboard();
  const [metricMode, setMetricMode] = useState<'headcount' | 'breakdown' | 'rates'>('breakdown');

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'headcount' | 'breakdown' | 'rates' | null
  ) => {
    if (newMode !== null) {
      setMetricMode(newMode);
    }
  };

  const isDark = theme.palette.mode === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Department-Wise Distribution
            </Typography>
            <Chip
              label="7 Divisions"
              size="small"
              color="primary"
              sx={{ height: 22, fontSize: '0.72rem', fontWeight: 700 }}
            />
            {filters.department && (
              <Chip
                label={`Active Filter: ${filters.department}`}
                size="small"
                color="secondary"
                variant="outlined"
                onDelete={() => setFilter('department', '')}
                sx={{ height: 22, fontSize: '0.72rem', fontWeight: 700 }}
              />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            Comparative headcount, present ratio, and remote workforce allocation (click bar to filter)
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={metricMode}
          exclusive
          onChange={handleModeChange}
          size="small"
          sx={{
            height: 32,
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
          <ToggleButton value="breakdown">Presence Mix</ToggleButton>
          <ToggleButton value="headcount">Total Staff</ToggleButton>
          <ToggleButton value="rates">Adherence %</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Empty State View if explicitly triggered */}
      {simulationState === 'empty' ? (
        <Box
          sx={{
            height: 340,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2.5,
            p: 3,
            gap: 1.5,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            No Department Records Available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, textAlign: 'center' }}>
            Current simulation filter returned 0 active department distributions.
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilterAltOffIcon />}
            onClick={() => setFilter('department', '')}
          >
            Clear Filters
          </Button>
        </Box>
      ) : (
        /* Guaranteed 340px Height Chart Container */
        <Box sx={{ width: '100%', height: 340, minHeight: 340 }}>
          <ResponsiveContainer width="100%" height={340}>
            {metricMode === 'breakdown' ? (
              <BarChart
                data={MOCK_DEPARTMENT_METRICS}
                margin={{ top: 10, right: 10, left: -15, bottom: 35 }}
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
                  barSize={16}
                >
                  {MOCK_DEPARTMENT_METRICS.map((entry) => (
                    <Cell
                      key={`present-${entry.department}`}
                      fill="#4f46e5"
                      opacity={!filters.department || filters.department === entry.department ? 1 : 0.35}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Bar>
                <Bar
                  dataKey="remote"
                  name="Remote / WFH"
                  fill="#06b6d4"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                >
                  {MOCK_DEPARTMENT_METRICS.map((entry) => (
                    <Cell
                      key={`remote-${entry.department}`}
                      fill="#06b6d4"
                      opacity={!filters.department || filters.department === entry.department ? 1 : 0.35}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Bar>
                <Bar
                  dataKey="onLeave"
                  name="On Leave"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                >
                  {MOCK_DEPARTMENT_METRICS.map((entry) => (
                    <Cell
                      key={`leave-${entry.department}`}
                      fill="#f59e0b"
                      opacity={!filters.department || filters.department === entry.department ? 1 : 0.35}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : metricMode === 'headcount' ? (
              <BarChart
                data={MOCK_DEPARTMENT_METRICS}
                margin={{ top: 10, right: 10, left: -15, bottom: 35 }}
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
                  dataKey="headcount"
                  name="Total Headcount"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                >
                  {MOCK_DEPARTMENT_METRICS.map((entry) => (
                    <Cell
                      key={`headcount-${entry.department}`}
                      fill={entry.color}
                      opacity={!filters.department || filters.department === entry.department ? 1 : 0.35}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <BarChart
                data={MOCK_DEPARTMENT_METRICS}
                margin={{ top: 10, right: 10, left: -10, bottom: 35 }}
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
                <YAxis stroke={textColor} fontSize={12} domain={[80, 100]} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: 10, fontSize: '0.8rem' }}
                />
                <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Target: 95%', position: 'top', fill: '#ef4444', fontSize: 11 }} />
                <Bar
                  dataKey="attendanceRate"
                  name="Attendance Adherence (%)"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={26}
                >
                  {MOCK_DEPARTMENT_METRICS.map((entry) => (
                    <Cell
                      key={`rate-${entry.department}`}
                      fill="#10b981"
                      opacity={!filters.department || filters.department === entry.department ? 1 : 0.35}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};
