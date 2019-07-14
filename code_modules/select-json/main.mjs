import util from 'util';
import sleep from './util/sleep.mjs';

export default async function main({context, setup, input}) {

  console.log(util.inspect(input,false,2,true))

  const output = {
    jsonString:''
  };

  return new Promise( async (resolve, reject) => {
    let selection = '';
    input.jsonList.forEach(stack=>{
      let passed = true;
      setup.stringList.forEach(needle=>{
        if(stack.includes(needle)) {
            // Yay! lol
        }else{
            passed = false;
        }
      });
      if(passed){
        selection = stack
      }
    })
    output.jsonString = selection;
    resolve(output);

  });

};
