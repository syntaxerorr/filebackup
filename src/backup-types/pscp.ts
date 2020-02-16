import { shellExe } from '../utils';
import { getBackupTypeSpec, BackupType } from '../enums';

/**
* Putty pscp.exe
*/
export async function pscp(source: string, destination: string) {
  console.log(`Using: ${getBackupTypeSpec(BackupType.pscp).description}, ${source}, ${destination}`);
  let test = await shellExe('ping 8.8.8.8');
  console.log(`test: ${test}`);
}