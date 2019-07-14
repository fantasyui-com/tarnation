import util from 'util';
import sleep from './util/sleep.mjs';

export default async function main({context, setup, input}) {

  //console.log(util.inspect(input,false,2,true))

  const output = {
    markdownText:"",
  };

  return new Promise( async (resolve, reject) => {
    let markdown = ['# Track This', 'Awesome list of sites that track you.'];
    input.profileList.forEach(profile=>{
      markdown.push(`## ${profile.title}`)
      markdown.push('');
      profile.urls.forEach(({title,url,hostname})=>{
        markdown.push(`- [${title} (${hostname})](${url})`)
      });
      markdown.push('');
      markdown.push('');
    });
    output.markdownText = markdown.join('\n');
    resolve(output);
  });

};
