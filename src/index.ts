import { shellExe } from './utils';

console.log('File backup script');
async function start() {
  let test = await shellExe('ping 8.8.8.8');
  console.log('end', test);
}


start();
