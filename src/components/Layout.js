import * as React from 'react';
import Container from '@mui/material/Container';
import AppBar  from './AppBar';
import { StateProvider } from '../utils/store.js'
import ImageModal from '../components/ImageModal'

export default function Layout({children}) {
  return (
    <StateProvider>
    <AppBar></AppBar>
    <Container style={{'marginTop':'80px'}} maxWidth="lg">
    {children}
    </Container>
    <ImageModal/>
    </StateProvider>
  );
}
