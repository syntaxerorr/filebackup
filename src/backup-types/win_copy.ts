import { shellExe, getDateStamp } from '../utils';
import { getBackupTypeSpec, BackupType } from '../enums';
import { File } from '../models';

/**
* Windows copy
*/
export async function win_copy(file: File) {
  const cmd = 'copy';
  const currentDate = getDateStamp();
  const sourceFile = `${file.sourceDir}${file.fileName}`;
  const destFile = `${file.destinationDir}${currentDate}-${file.fileName}`;
  console.log(`Running: ${getBackupTypeSpec(BackupType.win_copy).description}: ${sourceFile} -> ${destFile}`);
  const output = await shellExe(`${cmd} ${sourceFile} ${destFile}`);
  console.log(`Output: ${output}`);
}