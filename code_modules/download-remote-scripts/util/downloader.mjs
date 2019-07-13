import request from 'request';
export default function downloader(url){
  return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      resolve(`/* from ${url} */\n` + (body||'return null;'));
    });
  }); // Promise
}; // default function
