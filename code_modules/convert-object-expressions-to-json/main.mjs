import acorn from 'acorn';
import util from 'util';
import recurse from './util/recurse.mjs';

export default async function main({context, setup, input}) {

  const output = {
    jsonList:[],
  };

  return new Promise( async (resolve, reject) => {

    input.objectList.forEach((script,index) => {
      let parsed = acorn.parse('let x = '+ script, {});
      let jsonString = recurse({node: parsed.body[0].declarations[0].init})
      if((jsonString) && (jsonString.length > 2)){
         output.jsonList.push(jsonString)
      }
    });

    resolve(output);

  });

};
