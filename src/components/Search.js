import React , {useState,useEffect, useRef,useContext, useMemo} from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router'
import debounce from 'lodash.debounce'
import { store } from '../utils/store'
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import {useLocalStorage} from '../hooks/queryhooks'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '40%',
    margin:'auto'
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchBar() {

  const { dispatch ,state } = useContext(store)

  const router = useRouter()
  
  const inputRef=useRef(null)

  useEffect(() => {
    if (router.asPath ==='/')
    inputRef.current.blur()
  }, [router.asPath]);

  const debouncedQuery = useMemo(() => debounce((e)=>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  dispatch({type:'CHANGE_QUERY',payload:e.target.value}), 500), []);

  const  [storedValue, setValue]=useLocalStorage('recentqueries', [])

  useEffect(()=>{
    if (state.query){
      if(storedValue.length <5 && storedValue[storedValue.length-1]!==state.query){
        setValue([...storedValue,...[state.query]])
      }
      else if (storedValue.length >=5 && storedValue[storedValue.length-1]!==state.query){
        storedValue.shift()
        setValue([...storedValue,...[state.query]])
      }
    }

  },[state.query])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  const handleSuggestionClick = (value) => ()=>{
    inputRef.current.value=value
    dispatch({type:'CHANGE_QUERY',payload:value})
    handleClose()
  };

  const onFocus=(e) => {
  router.push('/search')
  if(!state.query && storedValue.length){
     handleClick(e)
  }}

  return (
      <>
        <Search>
        <SearchIconWrapper>
        <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
        placeholder="Search Photos..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={debouncedQuery}
        onFocus={onFocus}
        inputRef={inputRef}
     />
    </Search>

    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        disableRestoreFocus
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <List sx={{width:'300px'}}>
      {storedValue.map((item,index)=>(
        <ListItem disablePadding key={index}>
        <ListItemButton onClick={handleSuggestionClick(item)}>
          <ListItemText primary={item} />
        </ListItemButton>
      </ListItem>

      ))}
        <IconButton sx={{float:'right'}} onClick={()=>{
          setValue([])
          handleClose()
          }}>
          <DeleteOutlined />
        </IconButton>
        </List>
      </Popover>
    </>
  );
}