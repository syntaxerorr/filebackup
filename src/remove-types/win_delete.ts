import { File } from '../models';
import { getRemoveDateStamp, shellExe } from '../utils';
import * as fs from 'fs';

export async function win_delete(file: File, daysToKeep: number) {
  const cmd = 'del';
  const removeDate = getRemoveDateStamp(daysToKeep);
  const removeFile = `${file.destinationDir}${removeDate}-${file.fileName}`;
  console.log(`Running windows delete: ${removeFile}`);
  if (fs.existsSync(removeFile)) {
    const output = await shellExe(`${cmd} ${removeFile}`);
    if (!fs.existsSync(removeFile)) console.log(`File deleted`);
  } else {
    console.log(`File ${removeFile} does not exsit`);
  }
}