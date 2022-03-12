import http from './http'

export const fetchData = (query, method) => async ({
  pageParam = 1,
}) => {
  
  let url = `/services/rest`

  let params={
    "extras":"rotation,url_sq,url_q,url_t,url_s,url_n,url_w,url_m,url_z,url_c,url_l",
    "per_page":"24",
    "page":pageParam,
    "method":method,
    "api_key":"9ef4326b0e806466c6c0524f6a73b390",
    "format":"json",
    "hermes":"1",
    "hermesClient":"1",
    "nojsoncallback":"1",
    "lang": "en-US",
    'text':query,
    'sort': 'relevance',
    'content_type': 7,
    'parse_tags': 1,
    'safe_search':1
  }

  let res = await http.get(url,{params})
  return res.data
}
