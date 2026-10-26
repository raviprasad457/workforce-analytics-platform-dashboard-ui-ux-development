import React, { useState, useMemo } from 'react';
import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  LinearProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDashboard } from '../../context/DashboardContext';
import type { Employee, EmployeeStatus } from '../../types';
import { EmptyStateView } from '../Common/StateViews';

type Order = 'asc' | 'desc';
type OrderBy = keyof Employee;

const getDeptBadgeColor = (dept: string) => {
  switch (dept) {
    case 'Engineering':
      return { bg: 'rgba(59, 130, 246, 0.12)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)' };
    case 'Product & Design':
      return { bg: 'rgba(139, 92, 246, 0.12)', text: '#8b5cf6', border: 'rgba(139, 92, 246, 0.3)' };
    case 'Sales':
      return { bg: 'rgba(16, 185, 129, 0.12)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' };
    case 'Marketing':
      return { bg: 'rgba(245, 158, 11, 0.12)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' };
    case 'Human Resources':
      return { bg: 'rgba(236, 72, 153, 0.12)', text: '#ec4899', border: 'rgba(236, 72, 153, 0.3)' };
    case 'Finance':
      return { bg: 'rgba(6, 182, 212, 0.12)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.3)' };
    default:
      return { bg: 'rgba(99, 102, 241, 0.12)', text: '#6366f1', border: 'rgba(99, 102, 241, 0.3)' };
  }
};

export const EmployeeTable: React.FC = () => {
  const { filteredEmployees, setSelectedEmployee, simulationState, filters, setFilter } = useDashboard();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('name');
  const [tableSearch, setTableSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Filter with table-level search
  const displayedEmployees = useMemo(() => {
    let data = [...filteredEmployees];

    if (tableSearch) {
      const q = tableSearch.toLowerCase();
      data = data.filter(
        (emp) =>
          emp.name.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.role.toLowerCase().includes(q) ||
          emp.department.toLowerCase().includes(q) ||
          emp.id.toLowerCase().includes(q)
      );
    }

    data.sort((a, b) => {
      let aVal = a[orderBy];
      let bVal = b[orderBy];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return data;
  }, [filteredEmployees, tableSearch, order, orderBy]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusBadge = (status: EmployeeStatus) => {
    switch (status) {
      case 'Active':
        return { label: 'Active', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' };
      case 'Late':
        return { label: 'Late', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' };
      case 'On Leave':
        return { label: 'On Leave', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)' };
      case 'Remote':
        return { label: 'Remote', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.3)' };
      case 'Probation':
        return { label: 'Probation', color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' };
      default:
        return { label: status, color: '#64748b', bg: 'rgba(100, 116, 139, 0.12)', border: 'rgba(100, 116, 139, 0.3)' };
    }
  };

  if (simulationState === 'empty' || displayedEmployees.length === 0) {
    return (
      <EmptyStateView
        title="No Indian Personnel Records Found"
        description="Try adjusting your department, location, or search keywords to view registered team members."
      />
    );
  }

  const paginatedData = displayedEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      id="workforce-table-section"
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3.5,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
    >
      {/* Table Header Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <PeopleAltIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Indian Workforce Roster & Telemetry
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Displaying {displayedEmployees.length} registered team members across India campuses
            </Typography>
          </Box>
        </Box>

        {/* Quick Filter Pill Buttons & Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.8 }}>
            {['', 'Active', 'On Leave', 'Late', 'Remote'].map((st) => (
              <Chip
                key={st || 'All'}
                label={st || 'All (15)'}
                size="small"
                onClick={() => setFilter('status', st)}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  borderRadius: 1.5,
                  bgcolor: (filters.status === st) ? '#4f46e5' : 'transparent',
                  color: (filters.status === st) ? '#ffffff' : 'text.secondary',
                  border: '1px solid',
                  borderColor: (filters.status === st) ? '#4f46e5' : 'divider',
                  '&:hover': {
                    bgcolor: (filters.status === st) ? '#4338ca' : 'rgba(79, 70, 229, 0.08)',
                  },
                }}
              />
            ))}
          </Box>

          <TextField
            size="small"
            placeholder="Search Indian roster..."
            value={tableSearch}
            onChange={(e) => {
              setTableSearch(e.target.value);
              setPage(0);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: '#4f46e5' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: { xs: '100%', sm: 220 },
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </Box>
      </Box>

      {/* Table Responsive Container */}
      <TableContainer sx={{ overflowX: 'auto', borderRadius: 2 }}>
        <Table sx={{ minWidth: 850 }} aria-label="workforce table">
          <TableHead
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc',
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.78rem' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.78rem' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Employee Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.78rem' }}>
                <TableSortLabel
                  active={orderBy === 'department'}
                  direction={orderBy === 'department' ? order : 'asc'}
                  onClick={() => handleRequestSort('department')}
                >
                  Department & Role
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.78rem' }}>Location / Mode</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.78rem' }}>
                <TableSortLabel
                  active={orderBy === 'attendanceRate'}
                  direction={orderBy === 'attendanceRate' ? order : 'asc'}
                  onClick={() => handleRequestSort('attendanceRate')}
                >
                  Attendance Rate
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.78rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 800, fontSize: '0.78rem' }}>Clock-in</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.78rem' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((emp) => {
              const deptColor = getDeptBadgeColor(emp.department);
              const statusBadge = getStatusBadge(emp.status);

              return (
                <TableRow
                  key={emp.id}
                  hover
                  onClick={() => setSelectedEmployee(emp)}
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <TableCell sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'text.secondary' }}>
                    {emp.id}
                  </TableCell>

                  {/* Employee Avatar + Indian Name + Email */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={emp.avatar}
                        alt={emp.name}
                        sx={{
                          width: 38,
                          height: 38,
                          border: '2px solid',
                          borderColor: statusBadge.color,
                        }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                          {emp.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {emp.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Department & Role with colorful badge */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {emp.role}
                    </Typography>
                    <Chip
                      label={emp.department}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        bgcolor: deptColor.bg,
                        color: deptColor.text,
                        border: `1px solid ${deptColor.border}`,
                        mt: 0.3,
                      }}
                    />
                  </TableCell>

                  {/* Location & Work Mode */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{emp.location}</Typography>
                    <Chip
                      label={emp.workMode}
                      size="small"
                      variant="outlined"
                      sx={{ height: 18, fontSize: '0.68rem', mt: 0.3, fontWeight: 600 }}
                    />
                  </TableCell>

                  {/* Attendance Reliability Index */}
                  <TableCell sx={{ minWidth: 140 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#10b981' }}>
                        {emp.attendanceRate}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={emp.attendanceRate}
                      sx={{
                        height: 7,
                        borderRadius: 3.5,
                        bgcolor: 'rgba(16, 185, 129, 0.15)',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
                          borderRadius: 3.5,
                        },
                      }}
                    />
                  </TableCell>

                  {/* Colorful Status Chip with pulse dot */}
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.6,
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 2,
                        bgcolor: statusBadge.bg,
                        color: statusBadge.color,
                        border: `1px solid ${statusBadge.border}`,
                      }}
                    >
                      <FiberManualRecordIcon sx={{ fontSize: 9, color: statusBadge.color }} />
                      <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.72rem' }}>
                        {statusBadge.label}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Check-in Time */}
                  <TableCell sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
                    {emp.checkInTime}
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="right">
                    <Tooltip title="View Employee File">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmployee(emp);
                        }}
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                          p: 0.7,
                          color: '#4f46e5',
                          '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.1)' },
                        }}
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={displayedEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EmployeeTable;