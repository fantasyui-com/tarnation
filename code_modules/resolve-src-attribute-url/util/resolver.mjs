import cheerio from 'cheerio';

export default function resolver({html, url}){

  const $ = cheerio.load(html);
  $('script[src]').each(function(i, elem) {
    if( !$(this).attr('src').startsWith('http://') ){
      const myURL = new URL($(this).attr('src'), url);
      $(this).attr('src', myURL);
    }
  });

  return $.html();

}; // default function
