import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpIcon from '@mui/icons-material/Help';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useDashboard } from '../../context/DashboardContext';
import { NotificationsPopover } from '../Modals/NotificationsPopover';
import type { AppSimulationState } from '../../types';

export const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    themeMode,
    toggleThemeMode,
    toggleSidebar,
    setMobileDrawerOpen,
    filters,
    setFilter,
    simulationState,
    setSimulationState,
    refreshData,
  } = useDashboard();

  // Search input state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter('search', e.target.value);
  };

  // Notifications Popover state
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const handleOpenNotif = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleCloseNotif = () => {
    setNotifAnchor(null);
  };

  // User Profile Menu state
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setProfileAnchor(null);
  };

  // Simulation state toggle
  const handleSimulationChange = (
    _event: React.MouseEvent<HTMLElement>,
    newState: AppSimulationState | null
  ) => {
    if (newState !== null) {
      setSimulationState(newState);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1.5, sm: 3 }, minHeight: 68 }}>
          {/* Left: Hamburger menu toggle + Breadcrumbs */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              color="inherit"
              aria-label="toggle navigation"
              onClick={() => {
                if (isMobile) {
                  setMobileDrawerOpen(true);
                } else {
                  toggleSidebar();
                }
              }}
              edge="start"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 0.9,
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Enterprise Platform /
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { sm: '1rem', md: '1.15rem' }, lineHeight: 1.1 }}>
                Workforce Analytics
              </Typography>
            </Box>
          </Box>

          {/* Center: Global Search Bar */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              px: 1.8,
              py: 0.4,
              width: { md: 240, lg: 320 },
              transition: 'all 0.2s ease',
              '&:focus-within': {
                borderColor: 'primary.main',
                boxShadow: (t) => `0 0 0 3px ${t.palette.mode === 'dark' ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.1)'}`,
              },
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search employee, ID, role..."
              value={filters.search}
              onChange={handleSearchChange}
              sx={{ fontSize: '0.875rem', width: '100%' }}
              inputProps={{ 'aria-label': 'global search employees' }}
            />
            <Typography
              variant="caption"
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                px: 0.8,
                py: 0.2,
                borderRadius: 1,
                fontSize: '0.7rem',
                color: 'text.secondary',
                fontWeight: 600,
              }}
            >
              ⌘K
            </Typography>
          </Box>

          {/* Right: Simulation State Selector, Theme Toggle, Notifications & Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.5 } }}>
            {/* Interactive Simulation Switcher (Showcases Loading, Error, Empty states) */}
            {!isTablet && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1, fontWeight: 700, fontSize: '0.7rem' }}>
                  STATE DEMO:
                </Typography>
                <ToggleButtonGroup
                  value={simulationState}
                  exclusive
                  onChange={handleSimulationChange}
                  size="small"
                  aria-label="UI state demonstration"
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
                  <ToggleButton value="normal" aria-label="normal state">
                    <Tooltip title="Normal Live View">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                        <CheckCircleIcon sx={{ fontSize: 13, color: 'success.main' }} />
                        <span>Live</span>
                      </Box>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="loading" aria-label="loading skeleton state">
                    <Tooltip title="Skeleton Loading State">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                        <HourglassEmptyIcon sx={{ fontSize: 13, color: 'info.main' }} />
                        <span>Loading</span>
                      </Box>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="error" aria-label="error banner state">
                    <Tooltip title="Error & Retry State">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                        <ErrorIcon sx={{ fontSize: 13, color: 'error.main' }} />
                        <span>Error</span>
                      </Box>
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="empty" aria-label="empty no data state">
                    <Tooltip title="Empty Filter State">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                        <FilterAltOffIcon sx={{ fontSize: 13, color: 'warning.main' }} />
                        <span>Empty</span>
                      </Box>
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}

            {/* Refresh / Re-fetch button */}
            <Tooltip title="Refresh Dashboard Data">
              <IconButton
                onClick={refreshData}
                size="small"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 0.8,
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Theme Toggle (Light / Dark) */}
            <Tooltip title={themeMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
              <IconButton
                onClick={toggleThemeMode}
                size="small"
                color="inherit"
                id="theme-toggle-btn"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 0.8,
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'rotate(15deg)' },
                }}
              >
                {themeMode === 'light' ? (
                  <DarkModeOutlinedIcon fontSize="small" sx={{ color: '#475569' }} />
                ) : (
                  <LightModeOutlinedIcon fontSize="small" sx={{ color: '#f59e0b' }} />
                )}
              </IconButton>
            </Tooltip>

            {/* Notifications Menu */}
            <Tooltip title="Notifications (3 unread)">
              <IconButton
                onClick={handleOpenNotif}
                size="small"
                id="notifications-btn"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 0.8,
                }}
              >
                <Badge badgeContent={3} color="primary" variant="dot">
                  <NotificationsNoneOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ height: 28, my: 'auto', mx: 0.5 }} />

            {/* User Profile Dropdown */}
            <Box
              onClick={handleOpenProfile}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                cursor: 'pointer',
                p: 0.5,
                borderRadius: 2,
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                },
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                color="success"
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Elena Vance"
                  sx={{ width: 34, height: 34, border: '2px solid', borderColor: 'primary.main' }}
                />
              </Badge>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                  Elena Vance
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
                  VP People & Culture
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Popovers */}
      <NotificationsPopover
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleCloseNotif}
      />

      {/* User Menu */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={handleCloseProfile}
        slotProps={{
          paper: {
            sx: {
              width: 220,
              borderRadius: 3,
              mt: 1,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Elena Vance
          </Typography>
          <Typography variant="caption" color="text.secondary">
            elena.vance@workforceiq.com
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleCloseProfile}>
          <SettingsOutlinedIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <HelpIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Documentation & Help
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseProfile} sx={{ color: 'error.main' }}>
          <LogoutOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;