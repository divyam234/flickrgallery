import React ,{useEffect,memo} from 'react';
import { styled} from '@mui/material/styles';
import { useMemo} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useInView } from 'react-intersection-observer'
import GalleryItem  from './GalleryItem';
import Typography from '@mui/material/Typography';
import TopLoader from './TopLoader'

const Loader = styled('div')(({ theme }) => ({
   width: '100%',
    height: '70px',
    textAlign: 'center'
}));

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline:'0',
};

const ImageGalleryList = styled('ul')(({ theme }) => ({
  display: 'grid',
  padding: 0,
  margin: theme.spacing(0, 4),
  gap: 8,
  [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(3, 1fr)'
  },
  [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(4, 1fr)'
  },
}));

export default memo(function Gallery({data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching}) {

  const [ref, inView] = useInView({
    root:null,
    threshold: 0.25,
    rootMargin: '0px',
  })

    const photos=useMemo(()=>{
        if (data) {
         return data.pages.reduce((prev, curr) => 
          [...prev,...curr.photos.photo.filter(item=>item.hasOwnProperty('url_n'))], [])
        }
        else return []

    },[data])


    useEffect(()=>{
      if(inView && hasNextPage) fetchNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inView])


  return (
    <>
      {isFetching && !isFetchingNextPage && <TopLoader></TopLoader>}
    {data && photos.length >0 &&
    <ImageGalleryList>
     {photos.map(item=>(
      < GalleryItem {...item} key={item.id}/>
    ))}
    </ImageGalleryList>
    }

   {data && photos.length===0 && 
     <Typography sx={style} variant="h3"  gutterBottom component="div">
     No result Found
   </Typography>
   }

    <Loader ref={ref}>
     {photos.length >0 && hasNextPage && isFetchingNextPage && <CircularProgress />}
   </Loader>
   </>
  );
})
