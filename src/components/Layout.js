import  React from 'react';
import Container from '@mui/material/Container';
import AppBar  from './AppBar';
import { StateProvider } from '../utils/store.js'
import ImageModal from '../components/ImageModal'
import { ThemeProvider } from '../contexts/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';

export default function Layout({children}) {

  return (
    <ThemeProvider>
    <CssBaseline />
    <StateProvider>
    <AppBar></AppBar>
    <Container style={{'marginTop':'80px'}} maxWidth="lg">
    {children}
    </Container>
    <ImageModal/>
    </StateProvider>
    </ThemeProvider>
  );
}
