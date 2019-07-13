import download from './util/downloader.mjs';

export default async function main({context, setup, input}) {

  const output = {
    htmlList:[]
  };

  return new Promise(async (resolve, reject) => {

    for (const url of setup.websiteList) {
      output.htmlList.push( await download(url, setup.downloadCache) );
    }

    resolve(output);

  });

};
