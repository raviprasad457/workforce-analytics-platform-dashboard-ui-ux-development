import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useDashboard } from '../../context/DashboardContext';
import { DEPARTMENTS, LOCATIONS, STATUSES, WORK_MODES } from '../../data/mockData';

export const Filters: React.FC = () => {
  const {
    filters,
    setFilter,
    resetFilters,
    activeFilterCount,
    filteredEmployees,
  } = useDashboard();

  // Export filtered data as CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Department', 'Role', 'Location', 'Status', 'WorkMode', 'AttendanceRate', 'CheckInTime'];
    const rows = filteredEmployees.map((emp) => [
      emp.id,
      `"${emp.name}"`,
      emp.email,
      `"${emp.department}"`,
      `"${emp.role}"`,
      `"${emp.location}"`,
      emp.status,
      emp.workMode,
      `${emp.attendanceRate}%`,
      emp.checkInTime,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `workforce_india_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Paper
      id="filters-section"
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mt: 2.5,
        borderRadius: 3.5,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
    >
      {/* Title & Filter Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: 'rgba(79, 70, 229, 0.12)',
              color: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FilterListIcon fontSize="small" />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            India Hub Filters & Telemetry Selectors
          </Typography>
          {activeFilterCount > 0 && (
            <Chip
              label={`${activeFilterCount} Active`}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.72rem',
                fontWeight: 800,
                bgcolor: 'rgba(79, 70, 229, 0.15)',
                color: '#4f46e5',
                border: '1px solid rgba(79, 70, 229, 0.3)',
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={handleExportCSV}
            sx={{
              borderRadius: 2,
              fontSize: '0.8rem',
              fontWeight: 700,
              borderColor: 'rgba(79, 70, 229, 0.4)',
              color: '#4f46e5',
              '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.08)' },
            }}
          >
            Export CSV
          </Button>

          {activeFilterCount > 0 && (
            <Tooltip title="Reset all applied filters to default">
              <Button
                variant="text"
                color="secondary"
                size="small"
                startIcon={<FilterAltOffIcon />}
                onClick={resetFilters}
                sx={{ borderRadius: 2, fontSize: '0.8rem', fontWeight: 700 }}
              >
                Clear All
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Filter Select Controls Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
          gap: 1.5,
        }}
      >
        {/* Date Preset Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="filter-date-label">Date Window</InputLabel>
          <Select
            labelId="filter-date-label"
            id="filter-date-select"
            value={filters.datePreset}
            label="Date Window"
            onChange={(e) => setFilter('datePreset', e.target.value as any)}
            startAdornment={<CalendarMonthIcon fontSize="small" sx={{ mr: 0.8, color: '#4f46e5' }} />}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="today">Today (Live Telemetry)</MenuItem>
            <MenuItem value="7days">Last 7 Days</MenuItem>
            <MenuItem value="30days">Last 30 Days</MenuItem>
            <MenuItem value="90days">Last 90 Days (Quarter)</MenuItem>
          </Select>
        </FormControl>

        {/* Department Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="filter-department-label">Department</InputLabel>
          <Select
            labelId="filter-department-label"
            id="filter-department-select"
            value={filters.department}
            label="Department"
            onChange={(e) => setFilter('department', e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>All Departments (7)</em>
            </MenuItem>
            {DEPARTMENTS.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="filter-location-label">India Office / Campus</InputLabel>
          <Select
            labelId="filter-location-label"
            id="filter-location-select"
            value={filters.location}
            label="India Office / Campus"
            onChange={(e) => setFilter('location', e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>All Indian Hubs (7)</em>
            </MenuItem>
            {LOCATIONS.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="filter-status-label">Attendance Status</InputLabel>
          <Select
            labelId="filter-status-label"
            id="filter-status-select"
            value={filters.status}
            label="Attendance Status"
            onChange={(e) => setFilter('status', e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>All Statuses</em>
            </MenuItem>
            {STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Work Mode Filter */}
        <FormControl size="small" fullWidth>
          <InputLabel id="filter-mode-label">Work Arrangement</InputLabel>
          <Select
            labelId="filter-mode-label"
            id="filter-mode-select"
            value={filters.workMode}
            label="Work Arrangement"
            onChange={(e) => setFilter('workMode', e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>All Arrangements</em>
            </MenuItem>
            {WORK_MODES.map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Active Filter Chips Bar */}
      {activeFilterCount > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
            Active Filters:
          </Typography>

          {filters.datePreset !== 'today' && (
            <Chip
              label={`Period: ${filters.datePreset}`}
              size="small"
              onDelete={() => setFilter('datePreset', 'today')}
              sx={{ borderRadius: 1.5, fontWeight: 700 }}
            />
          )}

          {filters.department && (
            <Chip
              label={`Dept: ${filters.department}`}
              size="small"
              color="primary"
              onDelete={() => setFilter('department', '')}
              sx={{ borderRadius: 1.5, fontWeight: 700 }}
            />
          )}

          {filters.location && (
            <Chip
              label={`Hub: ${filters.location}`}
              size="small"
              color="info"
              onDelete={() => setFilter('location', '')}
              sx={{ borderRadius: 1.5, fontWeight: 700 }}
            />
          )}

          {filters.status && (
            <Chip
              label={`Status: ${filters.status}`}
              size="small"
              color="warning"
              onDelete={() => setFilter('status', '')}
              sx={{ borderRadius: 1.5, fontWeight: 700 }}
            />
          )}

          {filters.workMode && (
            <Chip
              label={`Mode: ${filters.workMode}`}
              size="small"
              onDelete={() => setFilter('workMode', '')}
              sx={{ borderRadius: 1.5, fontWeight: 700 }}
            />
          )}

          {filters.search && (
            <Chip
              label={`Query: "${filters.search}"`}
              size="small"
              onDelete={() => setFilter('search', '')}
              sx={{ borderRadius: 1.5, fontWeight: 700 }}
            />
          )}
        </Box>
      )}
    </Paper>
  );
};

export default Filters;