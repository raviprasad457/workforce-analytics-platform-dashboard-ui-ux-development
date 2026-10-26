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
import DownloadIcon from '@mui/icons-material/Download';
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

  const handleExportIndividualRecord = () => {
    const data = [
      `Employee ID: ${selectedEmployee.id}`,
      `Name: ${selectedEmployee.name}`,
      `Department: ${selectedEmployee.department}`,
      `Role: ${selectedEmployee.role}`,
      `Location: ${selectedEmployee.location}`,
      `Status: ${selectedEmployee.status}`,
      `Work Mode: ${selectedEmployee.workMode}`,
      `Attendance Rate: ${selectedEmployee.attendanceRate}%`,
      `Today Check-in: ${selectedEmployee.checkInTime}`,
      `Phone: ${selectedEmployee.phone}`,
      `Email: ${selectedEmployee.email}`,
      `Experience: ${selectedEmployee.experience}`,
      `Skills: ${selectedEmployee.skills.join(', ')}`,
    ].join('\n');

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedEmployee.name.replace(/\s+/g, '_')}_Profile.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            borderRadius: 3.5,
            p: 1,
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* Top Colorful Header Gradient Accent */}
      <Box
        sx={{
          height: 6,
          background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%)',
          borderRadius: '4px 4px 0 0',
        }}
      />

      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Indian Personnel File
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
            sx={{
              width: 76,
              height: 76,
              boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)',
              border: '3px solid #4f46e5',
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {selectedEmployee.name}
              </Typography>
              <Chip
                label={selectedEmployee.status}
                color={getStatusColor(selectedEmployee.status) as any}
                size="small"
                sx={{ height: 22, fontWeight: 800, fontSize: '0.75rem' }}
              />
              <Chip
                label={selectedEmployee.workMode}
                variant="outlined"
                size="small"
                sx={{ height: 22, fontSize: '0.75rem', fontWeight: 700 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, fontWeight: 600 }}>
              {selectedEmployee.role} • {selectedEmployee.department}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
              ID: {selectedEmployee.id}
            </Typography>
          </Box>
        </Box>

        {/* Attendance Score Card */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2.5,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)'
                : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Attendance Reliability Index
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#10b981' }}>
              {selectedEmployee.attendanceRate}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={selectedEmployee.attendanceRate}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(16, 185, 129, 0.15)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
                borderRadius: 4,
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Today's Check-in: <strong style={{ color: '#10b981' }}>{selectedEmployee.checkInTime}</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Tenure: <strong>{selectedEmployee.experience}</strong>
            </Typography>
          </Box>
        </Box>

        {/* Detailed Info Grid */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" sx={{ color: '#4f46e5' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedEmployee.email}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" sx={{ color: '#10b981' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedEmployee.phone}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon fontSize="small" sx={{ color: '#f59e0b' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedEmployee.location}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon fontSize="small" sx={{ color: '#8b5cf6' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedEmployee.department}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarMonthIcon fontSize="small" sx={{ color: '#06b6d4' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Joined: {selectedEmployee.joinDate}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" sx={{ color: '#ec4899' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Clock-in: {selectedEmployee.checkInTime}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Skills & Badges */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <WorkspacePremiumIcon fontSize="small" sx={{ color: '#f59e0b' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              Verified Technical & Functional Proficiencies
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedEmployee.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  borderRadius: 1.5,
                  fontWeight: 700,
                  bgcolor: 'rgba(79, 70, 229, 0.08)',
                  color: '#4f46e5',
                  border: '1px solid rgba(79, 70, 229, 0.25)',
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, py: 1.5 }}>
        <Button onClick={handleClose} variant="outlined" size="small" sx={{ borderRadius: 2 }}>
          Close
        </Button>
        <Button
          onClick={handleExportIndividualRecord}
          variant="contained"
          size="small"
          startIcon={<DownloadIcon />}
          sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)' }}
        >
          Download Record
        </Button>
      </DialogActions>
    </Dialog>
  );
};
