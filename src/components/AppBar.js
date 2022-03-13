import React ,{useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {NextLinkComposed} from './Link';
import { useTheme} from '@mui/material/styles';
import Search from './Search';
import ThemeSwitcherButton from './ThemeSwitcher';

export default function PrimarySearchAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Button sx={{fontSize: '1.0rem',fontWeight: 600,color:'white'}} 
         component={NextLinkComposed} to="/">
          Flickr
          </Button>
          <Search/>
          <ThemeSwitcherButton sx={{ right: 32 }}  color="inherit" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}