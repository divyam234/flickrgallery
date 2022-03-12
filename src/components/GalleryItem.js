import React ,{useCallback,useContext} from 'react';
import { styled} from '@mui/material/styles';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'
import { memo } from 'react';
import { store } from '../utils/store'

const LazyImage = styled(Image)(({ theme }) => ({
    transition: '0.5s ease-out'
}));

export default memo(function GalleryItem(item) {

  const { dispatch } = useContext(store)

  const handleOpen = useCallback(() => { 

    dispatch({type:'POPULATE_MODAL',payload:item})
    dispatch({type:'OPEN_MODAL'})},[dispatch,item])

  return (
     <ImageListItem>
      <LazyImage
        src={item['url_n']}
        blurDataURL={item['url_sq']}
        placeholder="blur"
        width={500}
        height={300}
        quality={100}
        loading="lazy"
        onClick={handleOpen}
      />
      </ImageListItem>
  );
})
