/**
 * Converts bytes to a human-readable string with appropriate unit
 * @param bytes - The number of bytes to format
 * @returns A formatted string (e.g., "1.5 MB", "250 KB")
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export const generateUUID = () => crypto.randomUUID(); 