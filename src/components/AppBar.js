import React ,{useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {NextLinkComposed} from './Link';
import dynamic from 'next/dynamic'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useTheme} from '@mui/material/styles';
import {ColorModeContext} from '../utils/context'

const SearchWithNoSSR = dynamic(
  () => import('./Search'),
  { ssr: false }
)

export default function PrimarySearchAppBar() {

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Button sx={{fontSize: '1.0rem',fontWeight: 600,color:'white'}} 
         component={NextLinkComposed} to="/">
          Flickr
          </Button>
          <SearchWithNoSSR/>
          <IconButton sx={{ right: 32 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}