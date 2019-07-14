import fs from 'fs';
import path from 'path';

export default function blackList(dir = './'){

  // returns integer
  let filePath = path.resolve(path.join(dir));
  let fileName = 'blacklist.json';
  let fullPath = path.join(filePath, fileName);

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, '{}');
  }
  const put = function(id){
    const data = JSON.parse(fs.readFileSync(fullPath));
    if(data[id]){
      data[id]++;
    }else{
      data[id] = 1;
    };
    fs.writeFileSync(fullPath, JSON.stringify(data, null, '  '));
  }
  const get = function(id){
    const data = JSON.parse(fs.readFileSync(fullPath));
    return data[id];
  }
  return {put,get};


}; // default function
