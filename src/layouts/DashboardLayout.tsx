import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { EmployeeDetailModal } from '../components/Modals/EmployeeDetailModal';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.25s ease, color 0.25s ease',
      }}
    >
      {/* Sidebar (handles desktop sticky & mobile drawer internally) */}
      <Sidebar />

      {/* Main Right Content Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // Prevents flex child from overflowing
          overflowX: 'hidden',
        }}
      >
        <Header />

        <Box
          component="main"
          sx={{
            flex: 1,
            py: { xs: 2.5, sm: 3.5 },
            px: { xs: 1.5, sm: 3, md: 4 },
          }}
        >
          <Container maxWidth="xl" disableGutters>
            {children}
          </Container>
        </Box>
      </Box>

      {/* Global Modals */}
      <EmployeeDetailModal />
    </Box>
  );
};

export default DashboardLayout;