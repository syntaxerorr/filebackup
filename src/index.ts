import { logToFile, shellExe } from './utils';
import * as config from './config.json';

logToFile();

// Exit if any unhandled errors occur
process.on('uncaughtException', function(err) {
  console.log(`ERROR uncaughtException: ${err}\nProgram will not terminate`);
  process.exit(1);
});

async function start() {
  console.log(`Backing up file: ${config.fileToBackup}`);
  let test = await shellExe('ping 8.8.8.8');
  console.log(`test: ${test}`);
}

start();
