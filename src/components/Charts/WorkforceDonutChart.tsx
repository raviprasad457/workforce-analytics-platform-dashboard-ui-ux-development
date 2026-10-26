import React, { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import {
  MOCK_WORKFORCE_PIE_EMPLOYMENT,
  MOCK_WORKFORCE_PIE_MODES,
} from '../../data/mockData';

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box
        sx={{
          bgcolor: (t) => (t.palette.mode === 'dark' ? '#1e293b' : '#ffffff'),
          color: (t) => (t.palette.mode === 'dark' ? '#f8fafc' : '#0f172a'),
          p: 1.5,
          borderRadius: 2,
          border: '1px solid',
          borderColor: (t) =>
            t.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          boxShadow: '0 8px 20px -4px rgba(0,0,0,0.2)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: data.color }} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {data.name}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          Headcount: <strong>{data.value.toLocaleString()}</strong> ({data.percentage}%)
        </Typography>
      </Box>
    );
  }
  return null;
};

export const WorkforceDonutChart: React.FC = () => {
  const [viewType, setViewType] = useState<'employment' | 'mode'>('employment');

  const handleTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: 'employment' | 'mode' | null
  ) => {
    if (newType !== null) {
      setViewType(newType);
    }
  };

  const chartData =
    viewType === 'employment' ? MOCK_WORKFORCE_PIE_EMPLOYMENT : MOCK_WORKFORCE_PIE_MODES;

  const totalHeadcount = 1284;

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Workforce Composition
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Segmented breakdown by contract & work arrangement
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleTypeChange}
          size="small"
          sx={{
            height: 28,
            '& .MuiToggleButton-root': {
              px: 1.2,
              py: 0,
              fontSize: '0.72rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 1.5,
            },
          }}
        >
          <ToggleButton value="employment">Type</ToggleButton>
          <ToggleButton value="mode">Arrangement</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Donut Chart with Center Metric */}
      <Box sx={{ position: 'relative', height: 230, width: '100%', my: 'auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {totalHeadcount.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
            Total Staff
          </Typography>
        </Box>
      </Box>

      {/* Legend Breakdown List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
        {chartData.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 0.4,
              px: 1,
              borderRadius: 1.5,
              '&:hover': {
                bgcolor: (t) =>
                  t.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {item.value}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {item.percentage}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
