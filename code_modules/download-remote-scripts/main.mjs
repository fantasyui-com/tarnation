import util from 'util';
import extractor from './util/extractor.mjs';
import downloader from './util/downloader.mjs';

export default async function main({context, setup, input}) {

  const output = {
    codeList:[]
  };

  return new Promise( async (resolve, reject) => {

    let remoteScriptUrlList = [];

    // multiple HTML files can return multiple script urls
    for (const html of input.htmlList) {
      const extracted = extractor(html, setup.excludeList);
      remoteScriptUrlList = remoteScriptUrlList.concat( extracted );
    }

    // but the list is flattened here so each url will return one js script string
    for (const url of remoteScriptUrlList) {
      output.codeList.push( await downloader(url) );
    }

    resolve(output);

  });

};
