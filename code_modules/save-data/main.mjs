import util from 'util';
import fs from 'fs';
import path from 'path';

export default async function main({context, setup, input}) {

  console.log(util.inspect(input,false,2,true))

  const output = {
    result:input.markdownText,
    location:path.resolve(setup.fileName),
  };

  return new Promise( async (resolve, reject) => {
    fs.writeFileSync(output.location, output.result);
    resolve(output);

  });

};
