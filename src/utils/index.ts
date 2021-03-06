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
  const tzOffset = (new Date()).getTimezoneOffset() * 60000;
  return new Date(Date.now() - tzOffset).toISOString();
}

export function getDateStamp(): string {
  const tzOffset = (new Date()).getTimezoneOffset() * 60000;
  let d = new Date(Date.now() - tzOffset),
    year = d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

export function getRemoveDateStamp(daysToKeep: number): string {
  const tzOffset = (new Date()).getTimezoneOffset() * 60000;
  const d = new Date(Date.now() - tzOffset);
  d.setDate(d.getDate() - daysToKeep);
  let year = d.getFullYear(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}
