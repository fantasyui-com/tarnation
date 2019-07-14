import util from 'util';
import sleep from './util/sleep.mjs';

import acorn from 'acorn';
import walk from 'acorn-walk';
import astring from 'astring';
const generate = astring.generate;

export default async function main({context, setup, input}) {

  const output = {
    objectList:[],
  };

  return new Promise( async (resolve, reject) => {


    // console.log('astring');
    // console.log(Object.keys(astring));


    input.codeList.forEach(script => {
      walk.simple(acorn.parse(script), {
        ObjectExpression(node) {
          let generated = generate(node).trim();
          if(generated.length > 2){ // meaning more than just '{}'
            output.objectList.push( generated );
          }
        }
      })
    });

    resolve(output);

  });

};
