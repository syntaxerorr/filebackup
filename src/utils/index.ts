import { exec } from 'child_process';
import * as fs from 'fs';
import * as config from '../config.json';

export function shellExe(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`ERROR shellExe: ${error.message}`);
        process.exit(1);
      }
      if (stderr) {
        console.log(`ERROR shellExe -> stderr: ${stderr}`);
        process.exit(1);
      }
      resolve(stdout);
    });
  });
}

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
