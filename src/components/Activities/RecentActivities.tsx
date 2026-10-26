import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { MOCK_ACTIVITIES, MOCK_EMPLOYEES } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import type { ActivityActionType } from '../../types';

const getActionBadge = (type: ActivityActionType) => {
  switch (type) {
    case 'check-in':
      return {
        color: 'success' as const,
        icon: <CheckCircleIcon sx={{ fontSize: 13 }} />,
        label: 'Verified Check-in',
      };
    case 'late':
      return {
        color: 'warning' as const,
        icon: <WarningAmberIcon sx={{ fontSize: 13 }} />,
        label: 'Late Check-in',
      };
    case 'leave':
      return {
        color: 'info' as const,
        icon: <BeachAccessOutlinedIcon sx={{ fontSize: 13 }} />,
        label: 'Leave Event',
      };
    case 'promotion':
      return {
        color: 'secondary' as const,
        icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 13 }} />,
        label: 'Promotion',
      };
    case 'training':
      return {
        color: 'primary' as const,
        icon: <SchoolOutlinedIcon sx={{ fontSize: 13 }} />,
        label: 'Certification',
      };
    case 'onboarding':
      return {
        color: 'success' as const,
        icon: <PersonAddAlt1OutlinedIcon sx={{ fontSize: 13 }} />,
        label: 'Onboarding',
      };
    default:
      return {
        color: 'default' as const,
        icon: <CheckCircleIcon sx={{ fontSize: 13 }} />,
        label: 'Activity',
      };
  }
};

export const RecentActivities: React.FC = () => {
  const { setSelectedEmployee } = useDashboard();
  const [tabValue, setTabValue] = useState<string>('all');

  const filteredActivities = MOCK_ACTIVITIES.filter((act) => {
    if (tabValue === 'attendance') {
      return act.actionType === 'check-in' || act.actionType === 'late';
    }
    if (tabValue === 'leaves') {
      return act.actionType === 'leave';
    }
    if (tabValue === 'milestones') {
      return (
        act.actionType === 'promotion' ||
        act.actionType === 'training' ||
        act.actionType === 'onboarding'
      );
    }
    return true;
  });

  const handleOpenEmployee = (employeeName: string) => {
    const emp = MOCK_EMPLOYEES.find((e) => e.name.toLowerCase().includes(employeeName.toLowerCase()) || employeeName.toLowerCase().includes(e.name.toLowerCase()));
    if (emp) {
      setSelectedEmployee(emp);
    } else if (MOCK_EMPLOYEES.length > 0) {
      setSelectedEmployee(MOCK_EMPLOYEES[0]);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with Title and Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Live Workforce Telemetry
            </Typography>
            <Chip
              label="Real-time Feed"
              size="small"
              color="success"
              variant="outlined"
              sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700 }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Continuous activity stream, clock-ins, credential updates & leaves
          </Typography>
        </Box>

        <Tabs
          value={tabValue}
          onChange={(_e, val) => setTabValue(val)}
          sx={{
            minHeight: 32,
            '& .MuiTab-root': {
              minHeight: 32,
              py: 0,
              px: 1.5,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 1.5,
            },
          }}
        >
          <Tab label="All (7)" value="all" />
          <Tab label="Attendance" value="attendance" />
          <Tab label="Leaves" value="leaves" />
          <Tab label="Milestones" value="milestones" />
        </Tabs>
      </Box>

      {/* Activity List Timeline */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
        {filteredActivities.map((act) => {
          const badge = getActionBadge(act.actionType);

          return (
            <Box
              key={act.id}
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
                bgcolor: (t) =>
                  t.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : '#f8fafc',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateX(3px)',
                },
              }}
            >
              {/* Left: Avatar + Details */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                <Avatar
                  src={act.employeeAvatar}
                  alt={act.employeeName}
                  sx={{ width: 40, height: 40, border: '2px solid', borderColor: 'divider' }}
                />

                <Box sx={{ minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography
                      variant="body2"
                      onClick={() => handleOpenEmployee(act.employeeName)}
                      sx={{
                        fontWeight: 700,
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                      }}
                    >
                      {act.employeeName}
                    </Typography>

                    <Chip
                      icon={badge.icon}
                      label={badge.label}
                      size="small"
                      color={badge.color}
                      sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700 }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'block',
                      mt: 0.3,
                      fontSize: '0.78rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {act.action}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <LocationOnOutlinedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                        {act.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                        {act.timestamp} • {act.timeAgo}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Right: Quick Action View */}
              <Tooltip title="View Employee File">
                <IconButton
                  size="small"
                  onClick={() => handleOpenEmployee(act.employeeName)}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 0.7,
                  }}
                >
                  <LaunchIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default RecentActivities;