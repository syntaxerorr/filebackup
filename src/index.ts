import { logToFile, shellExe } from './utils';
import * as config from './config.json';
import { win_copy, pscp } from './backup-types';
import { getBackupTypeSpec, BackupType } from './enums';
import { FileGroup, File } from './models';

logToFile();

// Exit if any unhandled errors occur
process.on('uncaughtException', function(err) {
  console.log(`ERROR uncaughtException: ${err}\nProgram will not terminate`);
  process.exit(1);
});

async function start() {
  for (const fileGroup of config.fileGroups) {
    console.log(`Backing up file group: ${fileGroup.description}`);
    await handleFileGroup(fileGroup);
  }
}

async function handleFileGroup(group: FileGroup) {
  console.log(group);
  if (group.runBefore) {
    const result = await shellExe(group.runBefore).catch(err => {
      console.log(`ERROR runBefore file missing: ${err}`);
      process.exit(1);
    });
    console.log(`Standard output of runBefore:\n${result}`);
  }
  await handleFiles(group);
}

async function handleFiles(group: FileGroup) {
  for (const file of group.files) { 
    await handleFile(file, group.backupType, group.options);
  }
}

async function handleFile(file: File, type: string, options?: any) {
  switch(type) {
    case getBackupTypeSpec(BackupType.win_copy).type: {
      await win_copy(file);
      break;
    }
    case getBackupTypeSpec(BackupType.pscp).type: {
      await pscp(file, options);
      break;
    }
    default: {
      console.log(`Unknown backup type: ${type}`);
      break;
    }
  }
}

start();
