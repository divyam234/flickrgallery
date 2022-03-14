import  React ,{useMemo,useContext,useLayoutEffect} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { store } from '../utils/store'

export default function ThemeWrap({children}) {

  const {darkMode } = useContext(store).state

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
        mode: darkMode ? 'dark' : 'light',
          
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              '*::-webkit-scrollbar': {
                width: '10px',
              },
              '*::-webkit-scrollbar-track': {
                background: darkMode ? '#424242' : '#FFFFFF',
                borderRadius: '10px',
              },
              '*::-webkit-scrollbar-thumb': {
                background: darkMode ? '#FFFFFF' : '#424242',
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
      }),
    [darkMode]
  )

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
    </ThemeProvider>
  );
}
