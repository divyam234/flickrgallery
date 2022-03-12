import React ,{useContext,useEffect} from 'react';
import Gallery from '../src/components/Gallery'
import { store } from '../src/utils/store'
import {useFetchPhotos} from '../src/hooks/queryhooks'

export default function Search() {

   const { state } = useContext(store)

   const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
} = useFetchPhotos(state.query, 'flickr.photos.search')

  return (
    <>
    {state.query && <Gallery {...{data, fetchNextPage, hasNextPage, isFetchingNextPage}}/>}
    </>
  );
}
