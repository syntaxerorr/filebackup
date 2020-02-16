import { shellExe } from '../utils';

export async function pscp() {
  let test = await shellExe('ping 8.8.8.8');
  console.log(`test: ${test}`);
}