import util from 'util';
import resolver from './util/resolver.mjs';

export default async function main({context, setup, input}) {

  const output = {
    htmlList:[],
  };

  return new Promise( async (resolve, reject) => {
    for (const {html, url} of input.htmlList) {
      output.htmlList.push( resolver({html, url}) );
    }
    resolve(output);

  });

};
