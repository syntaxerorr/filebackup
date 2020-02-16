/**
 * Model for config.json
 */
export interface FileGroup {
  id: string;
  description: string;
  backupType: string;
  runBefore?: string;
  connectionString?: string;
  files: Files[];
}

export interface Files {
  source: string;
  destination: string;
}