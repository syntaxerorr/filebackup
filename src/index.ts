import { logToFile, shellExe } from './utils';
import * as config from './config.json';
import { win_copy, pscp } from './backup-types';
import { getBackupTypeSpec, BackupType } from './enums';
import { FileGroup, Files } from './models';

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
    await handleFile(file.source, file.destination, group.backupType);
  }
}

async function handleFile(source: string, destination: string, type: string) {
  switch(type) {
    case getBackupTypeSpec(BackupType.pscp).type: {
      await pscp(source, destination);
      break;
    }
    case getBackupTypeSpec(BackupType.win_copy).type: {
      await win_copy(source, destination);
      break;
    }
    default: {
      console.log(`Unknown backup type: ${type}`);
      break;
    }
  }
}

start();
