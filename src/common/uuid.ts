import { v4 } from 'uuid';

export const UUID4_BYTES = 16;

export function generateUuidBytes(): Uint8Array {
  const buffer = new Uint8Array(UUID4_BYTES);
  v4(null, buffer);
  return buffer;
}
