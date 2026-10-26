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
import { useDashboard } from '../../context/DashboardContext';
import type { Employee, EmployeeStatus } from '../../types';
import { EmptyStateView } from '../Common/StateViews';

type Order = 'asc' | 'desc';
type OrderBy = keyof Employee;

export const EmployeeTable: React.FC = () => {
  const { filteredEmployees, setSelectedEmployee, simulationState } = useDashboard();

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

  const getStatusColor = (status: EmployeeStatus) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Late':
        return 'warning';
      case 'On Leave':
        return 'info';
      case 'Remote':
        return 'secondary';
      case 'Probation':
        return 'default';
      default:
        return 'default';
    }
  };

  if (simulationState === 'empty' || displayedEmployees.length === 0) {
    return (
      <EmptyStateView
        title="No Employees Found"
        description="Try adjusting your department, location, or search keywords to see matching roster members."
      />
    );
  }

  const paginatedData = displayedEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mt: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleAltIcon color="primary" fontSize="small" />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Workforce Roster & Attendance Status
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Showing {displayedEmployees.length} registered personnel
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <TextField
            size="small"
            placeholder="Search roster..."
            value={tableSearch}
            onChange={(e) => {
              setTableSearch(e.target.value);
              setPage(0);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
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
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f8fafc',
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Employee
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem' }}>
                <TableSortLabel
                  active={orderBy === 'department'}
                  direction={orderBy === 'department' ? order : 'asc'}
                  onClick={() => handleRequestSort('department')}
                >
                  Department & Role
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem' }}>Location / Mode</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem' }}>
                <TableSortLabel
                  active={orderBy === 'attendanceRate'}
                  direction={orderBy === 'attendanceRate' ? order : 'asc'}
                  onClick={() => handleRequestSort('attendanceRate')}
                >
                  Reliability Rate
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem' }}>Check-in</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.78rem' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((emp) => (
              <TableRow
                key={emp.id}
                hover
                onClick={() => setSelectedEmployee(emp)}
                sx={{
                  cursor: 'pointer',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }}>
                  {emp.id}
                </TableCell>

                {/* Employee Avatar + Name + Email */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      src={emp.avatar}
                      alt={emp.name}
                      sx={{ width: 36, height: 36, border: '1px solid', borderColor: 'divider' }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {emp.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {emp.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* Department & Role */}
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {emp.role}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {emp.department}
                  </Typography>
                </TableCell>

                {/* Location & Work Mode */}
                <TableCell>
                  <Typography variant="body2">{emp.location}</Typography>
                  <Chip
                    label={emp.workMode}
                    size="small"
                    variant="outlined"
                    sx={{ height: 18, fontSize: '0.68rem', mt: 0.3 }}
                  />
                </TableCell>

                {/* Attendance Reliability Index */}
                <TableCell sx={{ minWidth: 140 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {emp.attendanceRate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={emp.attendanceRate}
                    color={emp.attendanceRate > 95 ? 'success' : emp.attendanceRate > 90 ? 'primary' : 'warning'}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </TableCell>

                {/* Status Chip */}
                <TableCell>
                  <Chip
                    label={emp.status}
                    color={getStatusColor(emp.status) as any}
                    size="small"
                    sx={{ height: 22, fontWeight: 700, fontSize: '0.72rem' }}
                  />
                </TableCell>

                {/* Check-in Time */}
                <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  {emp.checkInTime}
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <Tooltip title="View Profile">
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
                      }}
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
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