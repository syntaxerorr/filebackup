import { logToFile } from './utils';
import * as config from './config.json';
import { BackupType } from './enums';
import { pscp } from './backup-types';

logToFile();

// Exit if any unhandled errors occur
process.on('uncaughtException', function(err) {
  console.log(`ERROR uncaughtException: ${err}\nProgram will not terminate`);
  process.exit(1);
});

async function start() {
  console.log(`Backing up file: ${config.fileToBackup}`);
  console.log(`Using backup method: ${config.backupType}`);
  switch(config.backupType) {
    case BackupType.pscp: {
      pscp();
      break;
    }
    default: {
      console.log(`Unknown backup type`);
      break;
    }

  }
}

start();
