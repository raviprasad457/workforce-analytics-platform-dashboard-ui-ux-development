import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark'): Theme => {
  const isLight = mode === 'light';

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? '#4f46e5' : '#6366f1',
        light: isLight ? '#818cf8' : '#a5b4fc',
        dark: isLight ? '#3730a3' : '#4338ca',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isLight ? '#0284c7' : '#38bdf8',
        light: isLight ? '#38bdf8' : '#7dd3fc',
        dark: isLight ? '#0369a1' : '#0284c7',
      },
      success: {
        main: isLight ? '#10b981' : '#34d399',
        light: '#6ee7b7',
        dark: '#047857',
        contrastText: '#ffffff',
      },
      warning: {
        main: isLight ? '#f59e0b' : '#fbbf24',
        light: '#fcd34d',
        dark: '#b45309',
        contrastText: '#ffffff',
      },
      error: {
        main: isLight ? '#ef4444' : '#f87171',
        light: '#fca5a5',
        dark: '#b91c1c',
      },
      info: {
        main: isLight ? '#06b6d4' : '#22d3ee',
        light: '#67e8f9',
        dark: '#0e7490',
      },
      background: {
        default: isLight ? '#f8fafc' : '#0b0f19',
        paper: isLight ? '#ffffff' : '#111827',
      },
      text: {
        primary: isLight ? '#0f172a' : '#f8fafc',
        secondary: isLight ? '#64748b' : '#94a3b8',
      },
      divider: isLight ? 'rgba(226, 232, 240, 0.8)' : 'rgba(255, 255, 255, 0.08)',
    },
    typography: {
      fontFamily: [
        '"Plus Jakarta Sans"',
        '"Inter"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      subtitle1: {
        fontWeight: 500,
      },
      subtitle2: {
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isLight ? '#cbd5e1 #f1f5f9' : '#334155 #0b0f19',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isLight ? '#cbd5e1' : '#334155',
              borderRadius: '8px',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: isLight
              ? '1px solid rgba(226, 232, 240, 0.8)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isLight
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 6,
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
