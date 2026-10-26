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
import BoltIcon from '@mui/icons-material/Bolt';
import { MOCK_ACTIVITIES, MOCK_EMPLOYEES } from '../../data/mockData';
import { useDashboard } from '../../context/DashboardContext';
import type { ActivityActionType } from '../../types';

const getActionBadge = (type: ActivityActionType) => {
  switch (type) {
    case 'check-in':
      return {
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        border: 'rgba(16, 185, 129, 0.3)',
        icon: <CheckCircleIcon sx={{ fontSize: 13, color: '#10b981' }} />,
        label: 'Verified Check-in',
      };
    case 'late':
      return {
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.3)',
        icon: <WarningAmberIcon sx={{ fontSize: 13, color: '#f59e0b' }} />,
        label: 'Late Check-in',
      };
    case 'leave':
      return {
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.12)',
        border: 'rgba(6, 182, 212, 0.3)',
        icon: <BeachAccessOutlinedIcon sx={{ fontSize: 13, color: '#06b6d4' }} />,
        label: 'Leave Event',
      };
    case 'promotion':
      return {
        color: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.12)',
        border: 'rgba(139, 92, 246, 0.3)',
        icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 13, color: '#8b5cf6' }} />,
        label: 'Promotion',
      };
    case 'training':
      return {
        color: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.12)',
        border: 'rgba(59, 130, 246, 0.3)',
        icon: <SchoolOutlinedIcon sx={{ fontSize: 13, color: '#3b82f6' }} />,
        label: 'Certification',
      };
    case 'onboarding':
      return {
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.12)',
        border: 'rgba(16, 185, 129, 0.3)',
        icon: <PersonAddAlt1OutlinedIcon sx={{ fontSize: 13, color: '#10b981' }} />,
        label: 'Onboarding',
      };
    default:
      return {
        color: '#6366f1',
        bg: 'rgba(99, 102, 241, 0.12)',
        border: 'rgba(99, 102, 241, 0.3)',
        icon: <CheckCircleIcon sx={{ fontSize: 13, color: '#6366f1' }} />,
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
      id="activities-section"
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3.5,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
    >
      {/* Header with Title and Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <BoltIcon fontSize="small" />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Live India Telemetry
              </Typography>
              <Chip
                label="Real-time Feed"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  bgcolor: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Continuous activity stream, clock-ins & leaves across Indian campuses
            </Typography>
          </Box>
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
              fontWeight: 700,
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
                p: 1.6,
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1.5,
                bgcolor: (t) =>
                  t.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.45)' : '#f8fafc',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: badge.color,
                  boxShadow: `0 4px 14px ${badge.color}18`,
                  transform: 'translateX(3px)',
                },
              }}
            >
              {/* Left: Avatar + Details */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                <Avatar
                  src={act.employeeAvatar}
                  alt={act.employeeName}
                  sx={{ width: 42, height: 42, border: '2px solid', borderColor: badge.color }}
                />

                <Box sx={{ minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography
                      variant="body2"
                      onClick={() => handleOpenEmployee(act.employeeName)}
                      sx={{
                        fontWeight: 800,
                        cursor: 'pointer',
                        color: 'text.primary',
                        '&:hover': { color: '#4f46e5', textDecoration: 'underline' },
                      }}
                    >
                      {act.employeeName}
                    </Typography>

                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 1,
                        py: 0.2,
                        borderRadius: 1.5,
                        bgcolor: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`,
                      }}
                    >
                      {badge.icon}
                      <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.68rem' }}>
                        {badge.label}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'block',
                      mt: 0.3,
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {act.action}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <LocationOnOutlinedIcon sx={{ fontSize: 13, color: '#4f46e5' }} />
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', fontWeight: 600 }}>
                        {act.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <AccessTimeIcon sx={{ fontSize: 13, color: '#06b6d4' }} />
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', fontWeight: 600 }}>
                        {act.timestamp} • {act.timeAgo}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Right: Quick Action View */}
              <Tooltip title="View Profile">
                <IconButton
                  size="small"
                  onClick={() => handleOpenEmployee(act.employeeName)}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 0.7,
                    color: '#4f46e5',
                    '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.1)' },
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