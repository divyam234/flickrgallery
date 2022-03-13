import React ,{useContext,useCallback} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {NextLinkComposed} from './Link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useTheme} from '@mui/material/styles';
import { store } from '../utils/store'
import Search from './Search'

export default function PrimarySearchAppBar() {

  const theme = useTheme();

  const { dispatch } = useContext(store)

  const toggleDarkMode=useCallback(()=>dispatch({ type: 'TOGGLE_DARKMODE' }),[dispatch])
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Button sx={{fontSize: '1.0rem',fontWeight: 600,color:'white'}} 
         component={NextLinkComposed} to="/">
          Flickr
          </Button>
          <Search/>
          <IconButton sx={{ right: 32 }} onClick={toggleDarkMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}