import { useInfiniteQuery} from 'react-query'
import { fetchData } from '../utils/common'

function queryEnabled(query, method){
   if (method==='flickr.interestingness.getList')
   return true

   else
   return query.length >0
}

export const useFetchPhotos = (query, method) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['photos', method, query],
    fetchData(query, method),
    {
      getNextPageParam: (lastPage, allPages) =>
      lastPage.photos.pages === allPages.length? undefined : allPages.length,
      staleTime: 5 * 60 * 1000,
      enabled: queryEnabled(query, method)
    }
  )

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  }
}
