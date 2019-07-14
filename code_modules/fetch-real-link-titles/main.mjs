import util from 'util';
import cheerio from 'cheerio';
import urlCacheInstance from 'url-data-cache';

export default async function main({context, setup, input}) {
  const urlCache = urlCacheInstance('download-web');

  // console.log(util.inspect(input,false,2,true))

  const output = {
    profileList: input.profileList, // pass it on
    // url: 'example.com',
    // meta: {},
    // data: {},
  };

  return new Promise( async (resolve, reject) => {

    output.profileList.forEach(profile=>{
      profile.urls.forEach(entry=>{
        let linkTitle = "";
        const cached = urlCache.get(entry.url);
        if(cached){
            try{
              const $ = cheerio.load(cached);
              let title = $('head > title').text() || '';
              let description = $('meta[name=description]').attr("content") || '';
              linkTitle = [title, description].filter(text=>text.length)
              .map(text => text.replace(/\]+/g, ')'))
              .map(text => text.replace(/\[+/g, '('))
              .map(text => text.replace(/[A-Za-z0-9,.’'-]{16,}/g, ''))
              .map(text => text.replace(/\n/g, ' '))
              .map(text => text.replace(/\r/g, ' '))
              .map(text => text.replace(/<[^>]*>/g, ''))
              .map(text => text.replace(/ +/g, ' '))
              .map(text=>text.trim())
              .filter(text=>text.length)
              .join(' - ')
              .trim();
              //console.log(`Cheerio extracted title ${title} from ${entry.hostname}`)
            }catch(e){
              // ignore
              //console.log(e);
            }
        } // cached?

        if(linkTitle){
          entry.title = linkTitle;
        }else{
          //console.info(`Unable to locate title (${linkTitle}) for ${entry.url}: ${fullPath}`)
          entry.title = entry.hostname;
        }

      }) // for each
    });

    resolve(output);

  });

};
