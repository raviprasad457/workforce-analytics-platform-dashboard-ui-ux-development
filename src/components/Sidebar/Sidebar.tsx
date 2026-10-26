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
import HubIcon from '@mui/icons-material/Hub';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDashboard } from '../../context/DashboardContext';

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactElement;
  badge?: string;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  active?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', title: 'Workforce Overview', icon: <DashboardIcon fontSize="small" />, active: true },
  { id: 'workforce', title: 'Employee Directory', icon: <PeopleAltOutlinedIcon fontSize="small" />, badge: '1,284' },
  { id: 'attendance', title: 'Attendance Radar', icon: <EventAvailableOutlinedIcon fontSize="small" />, badge: 'Live', badgeColor: 'success' },
  { id: 'departments', title: 'Department Metrics', icon: <CorporateFareOutlinedIcon fontSize="small" /> },
  { id: 'analytics', title: 'Predictive Analytics', icon: <InsightsOutlinedIcon fontSize="small" /> },
  { id: 'leaves', title: 'Leave & Absences', icon: <BeachAccessOutlinedIcon fontSize="small" />, badge: '3', badgeColor: 'warning' },
  { id: 'reports', title: 'Executive Reports', icon: <AssessmentOutlinedIcon fontSize="small" /> },
  { id: 'settings', title: 'Platform Settings', icon: <SettingsOutlinedIcon fontSize="small" /> },
];

export const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    sidebarCollapsed,
    mobileDrawerOpen,
    setMobileDrawerOpen,
  } = useDashboard();

  const sidebarWidth = sidebarCollapsed ? 76 : 260;

  const sidebarContent = (
    <Box
      sx={{
        width: isMobile ? 270 : sidebarWidth,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
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
          px: sidebarCollapsed && !isMobile ? 1.5 : 2.5,
          justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
              flexShrink: 0,
            }}
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
                      ? 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)'
                      : 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                WorkforceIQ
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', fontWeight: 600 }}>
                Enterprise 2026 v3.4
              </Typography>
            </Box>
          )}
        </Box>

        {isMobile && (
          <IconButton onClick={() => setMobileDrawerOpen(false)} size="small">
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation List */}
      <Box sx={{ flex: 1, py: 2, px: sidebarCollapsed && !isMobile ? 1 : 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            mb: 1,
            display: sidebarCollapsed && !isMobile ? 'none' : 'block',
            fontWeight: 700,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: '0.68rem',
          }}
        >
          Operations & Intelligence
        </Typography>

        <List sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {navItems.map((item) => {
            const isItemActive = item.active;

            const buttonElement = (
              <ListItemButton
                key={item.id}
                selected={isItemActive}
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  px: sidebarCollapsed && !isMobile ? 1.5 : 1.8,
                  justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start',
                  bgcolor: isItemActive
                    ? theme.palette.mode === 'dark'
                      ? 'rgba(99, 102, 241, 0.16)'
                      : 'rgba(79, 70, 229, 0.08)'
                    : 'transparent',
                  color: isItemActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: isItemActive
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(99, 102, 241, 0.22)'
                        : 'rgba(79, 70, 229, 0.12)'
                      : theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: sidebarCollapsed && !isMobile ? 'auto' : 34,
                    color: isItemActive ? 'primary.main' : 'text.secondary',
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
                          fontWeight: isItemActive ? 700 : 500,
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

      {/* Footer info box */}
      {(!sidebarCollapsed || isMobile) ? (
        <Box sx={{ p: 2, m: 1.5, borderRadius: 2.5, bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : '#f8fafc', border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
            <FiberManualRecordIcon sx={{ fontSize: 10, color: 'success.main' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              REAL-TIME RADAR
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
            Telemetry: 1,284 Devices
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.2 }}>
            Last sync 4 seconds ago
          </Typography>
        </Box>
      ) : (
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Tooltip title="Real-time Telemetry: Online">
            <FiberManualRecordIcon sx={{ fontSize: 12, color: 'success.main' }} />
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