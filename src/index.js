import { readFileSync } from 'fs';


const getFileAsString = (path) => {
  const readedFile = readFileSync(path);
  return JSON.parse(readedFile);
}


export const gendiff = (path1, path2) => {
  const obj1 = getFileAsString(path1);
  const obj2 = getFileAsString(path2);
  const result = ['{'];
  const merge = Object.assign({}, obj1, obj2);

  Object.keys(merge).sort().map(key => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(`- ${key}: ${obj1[key]}`);
      return;
    }
    
    if (!obj1.hasOwnProperty(key)) {
      result.push(`+ ${key}: ${obj2[key]}`);
      return;
    }

    if (obj1[key] !== obj2[key]) {
      result.push(`- ${key}: ${obj1[key]}`);
      result.push(`+ ${key}: ${obj2[key]}`);

      return;
    }
    
    result.push(`  ${key}: ${obj1[key]}`);
  })
  result.push('}');

  return result.join('\n');
}
