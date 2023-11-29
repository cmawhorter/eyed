import BaseX = require('base-x');

export const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const encoder = BaseX(alphabet);

export function base62Encode(value: Buffer | Uint8Array): string {
  return encoder.encode(value);
}

export function base62Decode(value: string): Uint8Array {
  return encoder.decode(value);
}

export function validBase62String(value: string): boolean {
  for (let i=0; i < value.length; i++) {
    const char = value[i];
    if (alphabet.indexOf(char) < 0) {
      return false;
    }
  }
  return true;
}
