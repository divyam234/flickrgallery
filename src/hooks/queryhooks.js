import { useInfiniteQuery} from 'react-query'
import { fetchData } from '../utils/common'
import {useState} from 'react';

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
      lastPage.photos.pages === allPages.length? undefined : allPages.length+1,
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

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined"){
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }

      else return initialValue
      
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
    
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      if (typeof window !== "undefined"){
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
     }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}