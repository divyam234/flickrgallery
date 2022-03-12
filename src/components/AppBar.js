import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Search  from './Search';
import {NextLinkComposed} from './Link';


export default function PrimarySearchAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Button sx={{fontSize: '1.0rem',fontWeight: 600,color:'white'}} 
         component={NextLinkComposed} to="/">
          GDrive
          </Button>
          <Search />
        </Toolbar>
      </AppBar>
    </Box>
  );
}