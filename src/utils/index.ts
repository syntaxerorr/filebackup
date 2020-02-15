import { exec } from 'child_process';

export function shellExe(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        process.exit(1);
      }
      resolve(stdout);
    });
  });
}
