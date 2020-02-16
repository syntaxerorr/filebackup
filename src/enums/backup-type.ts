/**
 * Enum for types of backups
 * @readonly
 * @enum {string}
 */
export enum BackupType {
  /** Putty pscp.exe */
  pscp
}

interface BackupTypeSpec {
  type: string;
  description: string;
}

export function getBackupTypeSpec(backupType: BackupType): BackupTypeSpec {
  switch (backupType) {
    case BackupType.pscp:
      return { type: 'pscp', description: 'Putty pscp.exe' };
    default:
      return { type: 'unknown', description: 'Unknown back up type' };
  }
}