import React from 'react';
import {
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

interface NotificationsPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const mockNotifications = [
  {
    id: 1,
    title: 'Bengaluru Campus Attendance Milestone',
    description: 'Engineering and Product teams crossed 98.6% attendance benchmark today.',
    time: '10m ago',
    type: 'success',
    icon: <CheckCircleIcon sx={{ color: '#10b981' }} fontSize="small" />,
  },
  {
    id: 2,
    title: 'Diwali Festive Leave Approved',
    description: 'Vikramaditya Verma confirmed optional leave roster for Mumbai team.',
    time: '42m ago',
    type: 'warning',
    icon: <BeachAccessIcon sx={{ color: '#f59e0b' }} fontSize="small" />,
  },
  {
    id: 3,
    title: 'Metro Delay Alert (Hyderabad)',
    description: 'Hitec City metro line delay reported (+18 late check-ins logged).',
    time: '1h ago',
    type: 'info',
    icon: <WarningAmberIcon sx={{ color: '#06b6d4' }} fontSize="small" />,
  },
];

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  anchorEl,
  open,
  onClose,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      slotProps={{
        paper: {
          sx: {
            width: 360,
            maxHeight: 460,
            p: 0,
            borderRadius: 3,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)',
          },
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
          India Hub Notifications
        </Typography>
        <Chip label="3 New" size="small" color="primary" sx={{ height: 22, fontSize: '0.75rem', fontWeight: 700 }} />
      </Box>
      <Divider />
      <List sx={{ p: 0 }}>
        {mockNotifications.map((notif, index) => (
          <React.Fragment key={notif.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                px: 2,
                py: 1.5,
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 42, mt: 0.5 }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  {notif.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {notif.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notif.time}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {notif.description}
                  </Typography>
                }
              />
            </ListItem>
            {index < mockNotifications.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Button size="small" fullWidth onClick={onClose} sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
          Mark All As Read
        </Button>
      </Box>
    </Popover>
  );
};
