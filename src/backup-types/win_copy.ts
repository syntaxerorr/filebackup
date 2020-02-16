import { shellExe } from '../utils';
import { getBackupTypeSpec, BackupType } from '../enums';

/**
* Windows copy
*/
const cmd = 'copy';
export async function win_copy(source: string, destination: string) {
  console.log(`Running: ${getBackupTypeSpec(BackupType.win_copy).description}, ${source} -> ${destination}`);
  let output = await shellExe(`${cmd} ${source} ${destination}`);
  console.log(`Output: ${output}`);
}