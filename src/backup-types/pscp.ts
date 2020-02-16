import { shellExe, getDateStamp } from '../utils';
import { getBackupTypeSpec, BackupType } from '../enums';
import { File, PscpOptions } from '../models';

/**
* Putty pscp.exe
*/
export async function pscp(file: File, options: PscpOptions) {
  const currentDate = getDateStamp();
  const sourceFile = `${file.sourceDir}${file.fileName}`;
  const destFile = `${file.destinationDir}${currentDate}-${file.fileName}`;
  const cmd = `pscp -P ${options.port} -l ${options.username} -i ${options.identityFile} ${options.host}:${sourceFile} ${destFile}`
  console.log(`Running: ${getBackupTypeSpec(BackupType.pscp).description}: ${options.host}:${sourceFile} -> ${destFile}`);
  const output = await shellExe(cmd);
  console.log(`Output: ${output}`);
}