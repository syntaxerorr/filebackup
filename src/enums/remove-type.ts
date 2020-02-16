/**
 * Enum for the method used to remove files
 * @readonly
 * @enum {string}
 */
export enum RemoveType {
  /** Windows delete */
  win_delete = 'win_delete',
  /** Linux delete */
  linux_delete = 'linux_delete'
}