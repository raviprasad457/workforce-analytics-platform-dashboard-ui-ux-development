import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { getAppTheme } from './theme/theme';
import Dashboard from './pages/Dashboard';

const AppContent: React.FC = () => {
  const { themeMode } = useDashboard();
  const theme = React.useMemo(() => getAppTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
};

export function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}

export default App;