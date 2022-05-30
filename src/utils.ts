/**
 * Escape HTML string
 */
export function escape(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/**
 * Check if passed parameter is String
 */
export function isString(obj: any): boolean {
  return Object.prototype.toString.call(obj) === "[object String]"
}
