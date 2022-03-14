import  React ,{useEffect,useState} from 'react';
import Container from '@mui/material/Container';
import AppBar  from './AppBar';
import { StateProvider } from '../utils/store.js'
import ImageModal from '../components/ImageModal'
import ThemeWrap from './ThemeWrap';


function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export default function Layout({children}) {

  const isMounted = useMounted()

  return (
    <StateProvider>
    {isMounted &&
    <ThemeWrap>
    <AppBar/>
    <Container style={{'marginTop':'80px'}} maxWidth="lg">
    {children}
    </Container>
    <ImageModal/>
    </ThemeWrap>
    }
    </StateProvider>
  );
}
