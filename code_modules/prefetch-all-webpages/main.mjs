import util from 'util';
import fs from 'fs';
import path from 'path';
import BlackList from './util/black-list.mjs';
import sleep from './util/sleep.mjs';
import request from 'request';
import urlCacheInstance from 'url-data-cache';
import pct from 'calculate-percent';

// TODO: optimize this - I am too tired now

export default async function main({context, setup, input}) {
  const blackList = BlackList(path.dirname(new URL(import.meta.url).pathname));
  const urlCache = urlCacheInstance('download-web');

  const output = {
    profileList: input.profileList, // pass it on
  };

  // prepare download list
  let downloadList = [];
  output.profileList.forEach(profile=>{
    profile.urls.forEach(entry=>{
      if(blackList.get(entry.url)>=3){
        console.info(`Skipping ${entry.url} as it it blacklisted`);
      }else{
        downloadList.push(entry);
      }
    }) // for each
  });

  // Old cache translation - useless now
  // downloadList.forEach(function({url, cas, hostname}){
  // let hostPath = hostname.split('.').map(i=>i.replace(/[^a-zA-Z0-9-]/,'_')).reverse().join('/')
  // let filePath = path.resolve(`./cache-web/${hostPath}`);
  // let fileName = cas + '.html';
  // let fullPath = path.join(filePath, fileName);
  // if (fs.existsSync(fullPath)) {
  //   let html = fs.readFileSync(fullPath).toString();
  //   urlCache.put(url,html,'100 years')
  // }
  // });

  console.log(`downloadList is ${downloadList.length} items long.`)

  //downloadHtmlCache.put(url,html,cacheDuration);

  return new Promise( async (resolve, reject) => {

    let index = 0;
    for (const {url,cas,hostname} of downloadList) {
      const progress = parseInt(pct(index+1, downloadList.length, 1)*100);
      const cached = urlCache.get(url);

      //   output.someList.push( await sleep(duration) );
      if(cached){
        // skip download
        // console.log(`Url is in cache: ${url}`)
      }else{
        // console.log(`Url will need to be downloaded: ${url}`)
        console.log(`${progress}%: downloading ${url}`);
        var configuration = {
          url,
          timeout: 9000,
          gzip: true,
          // jar: true,
          // followAllRedirects:true,
          headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.8",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
          }
        }; // Configuration
        blackList.put(url);

        await new Promise( (resolve, reject) => {
          request(configuration, function (error, response, body) {
            if(error){
              console.log(`Request error: ${error}`);
              //if(setup.debug) console.log(`Request response: ${response}`);
              if(setup.debug) console.log(`Request statusCode: ${response.statusCode}`);
              blackList.put(url);
              resolve();
            }else{
              //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              if(setup.debug) console.log(`Request statusCode: ${response.statusCode}`);
              // if(setup.debug) console.log(`Request body: ${body}`);
              //if(setup.debug) console.log('body:', body); // Print the HTML for the Google homepage.
              urlCache.put(url,body,'100 years');
              if(setup.debug) console.log(`Cached ${body.length} bytes of data into: ${fullPath}`);
              resolve();
            }
          });
        });

      } // ifs

      index++;
    } // Loop
    resolve(output);

  });

};
