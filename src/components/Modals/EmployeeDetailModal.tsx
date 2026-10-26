import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip,
  Grid,
  Divider,
  Button,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useDashboard } from '../../context/DashboardContext';

export const EmployeeDetailModal: React.FC = () => {
  const { selectedEmployee, setSelectedEmployee } = useDashboard();

  if (!selectedEmployee) return null;

  const handleClose = () => {
    setSelectedEmployee(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Late':
        return 'warning';
      case 'On Leave':
        return 'info';
      case 'Remote':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Dialog
      open={Boolean(selectedEmployee)}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Employee Profile
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 2.5 }}>
        {/* Header with Avatar and Basic Info */}
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', mb: 3 }}>
          <Avatar
            src={selectedEmployee.avatar}
            alt={selectedEmployee.name}
            sx={{ width: 72, height: 72, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedEmployee.name}
              </Typography>
              <Chip
                label={selectedEmployee.status}
                color={getStatusColor(selectedEmployee.status) as any}
                size="small"
                sx={{ height: 22, fontWeight: 700, fontSize: '0.75rem' }}
              />
              <Chip
                label={selectedEmployee.workMode}
                variant="outlined"
                size="small"
                sx={{ height: 22, fontSize: '0.75rem' }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
              {selectedEmployee.role} • {selectedEmployee.department}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {selectedEmployee.id}
            </Typography>
          </Box>
        </Box>

        {/* Attendance Score Card */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#f8fafc',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Attendance Reliability Index
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>
              {selectedEmployee.attendanceRate}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={selectedEmployee.attendanceRate}
            color="success"
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Today's Check-in: <strong>{selectedEmployee.checkInTime}</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Tenure: <strong>{selectedEmployee.experience}</strong>
            </Typography>
          </Box>
        </Box>

        {/* Detailed Info Grid */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">{selectedEmployee.email}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">{selectedEmployee.phone}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">{selectedEmployee.location}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">{selectedEmployee.department}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarMonthIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">Joined: {selectedEmployee.joinDate}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">Clock-in: {selectedEmployee.checkInTime}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Skills & Badges */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <WorkspacePremiumIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Verified Skills & Proficiencies
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedEmployee.skills.map((skill) => (
              <Chip key={skill} label={skill} size="small" variant="outlined" sx={{ borderRadius: 1.5 }} />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, py: 1.5 }}>
        <Button onClick={handleClose} variant="outlined" size="small">
          Close
        </Button>
        <Button onClick={handleClose} variant="contained" size="small">
          Export Record
        </Button>
      </DialogActions>
    </Dialog>
  );
};
