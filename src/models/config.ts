/**
 * Model for config.json
 */
export interface FileGroup {
  id: string;
  description: string;
  backupType: string;
  runBefore?: string;
  options: any;
  files: File[];
}

export interface File {
  fileName: string;
  sourceDir: string;
  destinationDir: string;
}

export interface PscpOptions {
  host: string;
  port: string;
  username: string;
  identityFile: string;
}

export interface ScpOptions {
  host: string;
  port: string;
  username: string;
  identityFile: string;
}