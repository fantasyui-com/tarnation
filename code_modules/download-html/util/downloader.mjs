import request from 'request';
import urlCacheInstance from 'url-data-cache';
const downloadHtmlCache = urlCacheInstance('download-html');

export default function download(url,cacheDuration='1 hour'){
  return new Promise(function(resolve, reject) {
    const cached = downloadHtmlCache.get(url);
    // if(cached) console.log('data was cached!')
    if(cached) return resolve({ url, html:cached });
    request(url, function (error, response, html) {
      if(error){
         console.log(error);
         resolve({ url, html:"<html/>" });
       }else{
         // console.log('Data OK, saving cache')
         downloadHtmlCache.put(url,html,cacheDuration);
         resolve({ url, html });
      }
    });
  });
};
