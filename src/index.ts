import { logToFile } from './utils';
import * as config from './config.json';
import { pscp } from './backup-types';
import { getBackupTypeSpec, BackupType } from './enums';

logToFile();

// Exit if any unhandled errors occur
process.on('uncaughtException', function(err) {
  console.log(`ERROR uncaughtException: ${err}\nProgram will not terminate`);
  process.exit(1);
});

async function start() {
  console.log(`Backing up file: ${config.fileToBackup}`);
  switch(config.backupType) {
    case getBackupTypeSpec(BackupType.pscp).type: {
      pscp();
      break;
    }
    default: {
      console.log(`Unknown backup type: ${config.backupType}`);
      break;
    }

  }
}

start();
