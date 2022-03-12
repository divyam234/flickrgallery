import React from 'react';
import Gallery from '../src/components/Gallery'
import {useFetchPhotos} from '../src/hooks/queryhooks'


export default function Index() {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
} = useFetchPhotos('', 'flickr.interestingness.getList')

  return (
    <>
     <Gallery {...{data, fetchNextPage, hasNextPage, isFetchingNextPage}}/>
    </>
  );
}
