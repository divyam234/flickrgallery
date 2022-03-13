import  React ,{useState,useMemo} from 'react';
import Container from '@mui/material/Container';
import AppBar  from './AppBar';
import { StateProvider } from '../utils/store.js'
import ImageModal from '../components/ImageModal'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import {ColorModeContext} from '../utils/context'

export default function Layout({children}) {

  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() =>createTheme({
    palette: {
      mode,
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  }),[mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <StateProvider>
    <AppBar></AppBar>
    <Container style={{'marginTop':'80px'}} maxWidth="lg">
    {children}
    </Container>
    <ImageModal/>
    </StateProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
