import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HubIcon from '@mui/icons-material/Hub';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDashboard } from '../../context/DashboardContext';

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactElement;
  color: string;
  badge?: string;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const navItems: NavItem[] = [
  { id: 'dashboard', title: 'Workforce Overview', icon: <DashboardIcon fontSize="small" />, color: '#4f46e5' },
  { id: 'workforce', title: 'Employee Directory', icon: <PeopleAltOutlinedIcon fontSize="small" />, color: '#8b5cf6', badge: '1,284' },
  { id: 'attendance', title: 'Attendance Radar', icon: <EventAvailableOutlinedIcon fontSize="small" />, color: '#10b981', badge: 'Live', badgeColor: 'success' },
  { id: 'departments', title: 'Department Metrics', icon: <CorporateFareOutlinedIcon fontSize="small" />, color: '#06b6d4' },
  { id: 'analytics', title: 'Predictive Analytics', icon: <InsightsOutlinedIcon fontSize="small" />, color: '#f59e0b' },
  { id: 'leaves', title: 'Leave & Absences', icon: <BeachAccessOutlinedIcon fontSize="small" />, color: '#f43f5e', badge: '3', badgeColor: 'warning' },
  { id: 'reports', title: 'Executive Reports', icon: <AssessmentOutlinedIcon fontSize="small" />, color: '#3b82f6' },
  { id: 'settings', title: 'Platform Settings', icon: <SettingsOutlinedIcon fontSize="small" />, color: '#64748b' },
];

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    activeNavSection,
    handleNavigate,
  } = useDashboard();

  const sidebarWidth = sidebarCollapsed ? 76 : 260;

  const sidebarContent = (
    <Box
      sx={{
        width: isMobile ? 270 : sidebarWidth,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.mode === 'dark' ? '#0b1120' : '#ffffff',
        borderRight: '1px solid',
        borderColor: 'divider',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowX: 'hidden',
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          height: 68,
          display: 'flex',
          alignItems: 'center',
          px: sidebarCollapsed && !isMobile ? 1.5 : 2,
          justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
              flexShrink: 0,
              cursor: 'pointer',
            }}
            onClick={() => handleNavigate('dashboard')}
          >
            <HubIcon fontSize="small" />
          </Box>

          {(!sidebarCollapsed || isMobile) && (
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)'
                      : 'linear-gradient(135deg, #0f172a 0%, #4f46e5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                WorkforceIQ
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', fontWeight: 600 }}>
                India Enterprise Hub
              </Typography>
            </Box>
          )}
        </Box>

        {isMobile ? (
          <IconButton onClick={() => setMobileDrawerOpen(false)} size="small">
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          !sidebarCollapsed && (
            <Tooltip title="Collapse Sidebar">
              <IconButton
                onClick={toggleSidebar}
                size="small"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1.5,
                  p: 0.6,
                }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        )}
      </Box>

      {/* Expand Button when Collapsed on Desktop */}
      {sidebarCollapsed && !isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
          <Tooltip title="Expand Sidebar">
            <IconButton
              onClick={toggleSidebar}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1.5,
                p: 0.6,
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Navigation List */}
      <Box sx={{ flex: 1, py: 2, px: sidebarCollapsed && !isMobile ? 1 : 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            mb: 1.2,
            display: sidebarCollapsed && !isMobile ? 'none' : 'block',
            fontWeight: 800,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: '0.68rem',
          }}
        >
          Operations & Intelligence
        </Typography>

        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.8 }}>
          {navItems.map((item) => {
            const isItemActive = activeNavSection === item.id;

            const buttonElement = (
              <ListItemButton
                key={item.id}
                selected={isItemActive}
                onClick={() => handleNavigate(item.id)}
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  px: sidebarCollapsed && !isMobile ? 1.5 : 1.8,
                  justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: isItemActive
                    ? theme.palette.mode === 'dark'
                      ? 'linear-gradient(90deg, rgba(79, 70, 229, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)'
                      : 'linear-gradient(90deg, rgba(79, 70, 229, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)'
                    : 'transparent',
                  border: isItemActive ? '1px solid' : '1px solid transparent',
                  borderColor: isItemActive
                    ? theme.palette.mode === 'dark'
                      ? 'rgba(99, 102, 241, 0.4)'
                      : 'rgba(79, 70, 229, 0.25)'
                    : 'transparent',
                  color: isItemActive ? 'primary.main' : 'text.primary',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: isItemActive
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(79, 70, 229, 0.3)'
                        : 'rgba(79, 70, 229, 0.16)'
                      : theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(0, 0, 0, 0.04)',
                    transform: sidebarCollapsed ? 'none' : 'translateX(3px)',
                  },
                }}
              >
                {/* Active Left Indicator Bar */}
                {isItemActive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: '15%',
                      bottom: '15%',
                      width: 4,
                      borderRadius: '0 4px 4px 0',
                      bgcolor: item.color,
                      boxShadow: `0 0 8px ${item.color}`,
                    }}
                  />
                )}

                <ListItemIcon
                  sx={{
                    minWidth: sidebarCollapsed && !isMobile ? 'auto' : 34,
                    color: isItemActive ? item.color : item.color,
                    filter: isItemActive ? 'drop-shadow(0 0 6px rgba(79,70,229,0.5))' : 'none',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {(!sidebarCollapsed || isMobile) && (
                  <ListItemText
                    primary={item.title}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.86rem',
                          fontWeight: isItemActive ? 800 : 500,
                          color: isItemActive ? (theme.palette.mode === 'dark' ? '#ffffff' : '#0f172a') : 'text.primary',
                        },
                      },
                    }}
                  />
                )}

                {(!sidebarCollapsed || isMobile) && item.badge && (
                  <Chip
                    label={item.badge}
                    color={item.badgeColor || 'default'}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      borderRadius: 1.2,
                    }}
                  />
                )}
              </ListItemButton>
            );

            if (sidebarCollapsed && !isMobile) {
              return (
                <Tooltip key={item.id} title={item.title} placement="right" arrow>
                  {buttonElement}
                </Tooltip>
              );
            }

            return buttonElement;
          })}
        </List>
      </Box>

      {/* Footer info box with glowing telemetry */}
      {(!sidebarCollapsed || isMobile) ? (
        <Box
          sx={{
            p: 2,
            m: 1.5,
            borderRadius: 2.5,
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)'
                : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
            <FiberManualRecordIcon sx={{ fontSize: 10, color: '#10b981', filter: 'drop-shadow(0 0 4px #10b981)' }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.04em' }}>
              INDIA RADAR TELEMETRY
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.82rem' }}>
            Live Sync: 1,284 Devices
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.2 }}>
            Connected to Bengaluru HQ Gateway
          </Typography>
        </Box>
      ) : (
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Tooltip title="Real-time Telemetry: Online (Bengaluru Hub)">
            <FiberManualRecordIcon sx={{ fontSize: 12, color: 'success.main', filter: 'drop-shadow(0 0 4px #10b981)' }} />
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 270 },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop / Tablet Sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: sidebarWidth,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: (t) => t.zIndex.drawer,
        }}
      >
        {sidebarContent}
      </Box>
    </>
  );
};

export default Sidebar;