import { createTheme, type PaletteMode } from '@mui/material/styles'

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#7c9cff' : '#3d5afe',
      },
      secondary: {
        main: mode === 'dark' ? '#80cbc4' : '#00897b',
      },
      background: {
        default: mode === 'dark' ? '#0f1117' : '#f4f6fb',
        paper: mode === 'dark' ? '#171a21' : '#ffffff',
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
      },
    },
  })
}
