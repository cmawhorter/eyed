import { v4 } from 'uuid';

export const UUID4_BYTES = 16;

export function generateUuidBytes(bytes: number = UUID4_BYTES): Uint8Array {
  if (typeof bytes !== 'number' || bytes < 1) {
    throw new Error(`too few bytes; a minimum of 1 byte is required but received "${bytes}"`);
  }
  if (bytes > UUID4_BYTES) {
    throw new Error(`too many bytes; a maximum of ${UUID4_BYTES} bytes is required`);
  }
  const buffer = new Uint8Array(UUID4_BYTES);
  v4(undefined, buffer);
  return bytes === UUID4_BYTES ? buffer : sliceBytes(buffer, 0, bytes);
}

export function sliceBytes(source: Uint8Array, startIndex: number, count: number): Uint8Array {
  const result = new Uint8Array(count);
  for (let i=startIndex; i < count; i++) {
    result[i] = source[i];
  }
  return result;
}
