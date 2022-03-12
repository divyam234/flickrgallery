import React ,{useEffect} from 'react';
import { styled} from '@mui/material/styles';
import { useMemo} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import { useInView } from 'react-intersection-observer'
import GalleryItem  from './GalleryItem';
import Typography from '@mui/material/Typography';

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

export default function Gallery({data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage}) {

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

    console.log(data)

    useEffect(()=>{
      if(inView && hasNextPage) fetchNextPage()
    },[inView])


  return (
    <>
    {data && photos.length >0 &&
    <ImageList variant="masonry" cols={3} gap={8}>
     {photos.map(item=>(
      < GalleryItem {...item} key={item.id}/>
    ))}
    </ImageList>
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
}
