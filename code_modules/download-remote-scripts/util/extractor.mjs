import cheerio from 'cheerio';
export default function extractor(html, excludeList){
  const response = []
  const $ = cheerio.load(html);
  $('script[src]').each(function(i, elem) {
    let url = $(this).attr('src').toString();
    let isValid = true;
    (excludeList||[]).forEach(function(blacklisted){
      if(url.match(blacklisted)){
        isValid = false;
      }
    })
    if(isValid){
      response.push( url );
    }
  });
  return response;
}; // default function
