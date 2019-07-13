import util from 'util';
import cheerio from 'cheerio';
//import sleep from './util/sleep.mjs';

export default async function main({context, setup, input}) {

  console.log(util.inspect(input,false,2,true))

  const output = {
    codeList:[], // we are acumulate data here
    htmlList: input.htmlList // using this again, it will be dropped later
  };

  return new Promise( async (resolve, reject) => {

    input.htmlList.forEach(html=>{
      const $ = cheerio.load(html);
      $('script').each(function(i, elem) {
        if($(this).html()){
          output.codeList.push( $(this).html() );
        } // if
      }); // each
    });

    resolve(output);

  });

};
