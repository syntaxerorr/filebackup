import { exec } from 'child_process';
import * as fs from 'fs';
import * as config from '../config.json';

/**
* Run a shell command
* If any command fails we exit
*/
export function shellExe(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`ERROR shellExe: ${error.message}\nProgram will now terminate`);
        process.exit(1);
      }
      if (stderr) {
        console.log(`ERROR shellExe -> stderr: ${stderr}\nProgram will now terminate`);
        process.exit(1);
      }
      resolve(stdout);
    });
  });
}

/**
* Redirect console.log to a file
* and optionally echo to screen
*/
export function logToFile(): void {
  const originalLog = console.log;
  const logStream = fs.createWriteStream(config.logFile, { flags: 'a' });

  console.log = function (msg: string) {
    if (config.echoToScreen) originalLog(msg);
    logStream.write(`${getTimeStamp()} ${msg}\n`);
  }
}

function getTimeStamp(): string {
  var tzOffset = (new Date()).getTimezoneOffset() * 60000;
  return new Date(Date.now() - tzOffset).toISOString();
}
