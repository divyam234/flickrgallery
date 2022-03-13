import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const darkTheme = responsiveFontSizes(createTheme({
    palette: {
    mode: 'dark'

    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*::-webkit-scrollbar': {
            width: '10px',
          },
          '*::-webkit-scrollbar-track': {
            background: '#424242',
            borderRadius: '10px',
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#FFFFFF',
            borderWidth: '1px 1px 1px 6px',
            minHeight: '28px',
            padding: '100px 0 0',
            borderRadius: '10px',
          },
          '*-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
      }
    },
  }))

export default darkTheme