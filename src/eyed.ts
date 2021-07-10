import { ok } from 'assert';
import { base62Decode, base62Encode, validBase62String } from './common/base62';
import { generateUuidBytes, UUID4_BYTES } from './common/uuid';
import { E_MALFORMED } from './constants';

type Separator = null | string;

const defaultSeparator = '_';

/**
 * Create base62 encoded uuid v4
 * @returns
 */
export function generateUuid(byteCount?: number): string {
  const bytes = generateUuidBytes(byteCount);
  return base62Encode(bytes);
}

/**
 * @deprecated
 * @alias generateUuid
 */
export const uuid = generateUuid;

/**
 * Create a unique, prefixed base62 encoded uuid
 * @param prefix
 * @param separator
 * @returns
 */
export function generateId(
  prefix: string,
  separator: Separator = defaultSeparator,
  byteCount?: number
): string {
  return prefix + (separator || '') + generateUuid(byteCount);
}

/**
 * @deprecated
 * @alias generateId
 */
 export const id = generateId;

/**
 * This just does id.bind(null, prefix, separator). Use that directly instead.
 * @deprecated
 * @param prefix
 * @param separator
 * @returns
 */
export function create(
  prefix: string,
  separator: Separator = defaultSeparator
): () => string {
  return generateId.bind(null, prefix, separator);
}

/**
 * Takes a prefixed id and parses it into a hash of its component parts
 * @param value
 * @param prefix
 * @param separator
 * @returns
 */
export function parseId(
  value: string,
  prefix: string,
  separator: Separator = defaultSeparator
): { prefix: string; separator: string; uuid: string; } {
  ok(0 === value.indexOf(prefix),
    `${E_MALFORMED}; "${value}" must start with "${prefix}"`);
  if (separator) {
    // we do 3 so we can catch invalid ids here but mitigate abuse
    const result = value.split(separator, 3);
    ok(result.length === 2,
      `${E_MALFORMED}; separator "${separator}" found in id "${value}" multiple times`);
    ok(typeof result[1] === 'string' && result[1].length > 0,
      `${E_MALFORMED}; no uuid portion of id found for "${value}" with separator "${separator}"`);
    return { prefix, separator, uuid: result[1] };
  }
  const uuidValue = value.slice(prefix.length);
  ok(typeof uuidValue === 'string' && uuidValue.length > 0,
    `${E_MALFORMED}; no uuid portion of id found for "${value}" without separator`);
  return { prefix, separator: separator || '', uuid: uuidValue };
}

/**
 * Takes an unknown value and makes sure it _looks like_ a valid id.
 *
 * Set strict to true to make sure the uuid _looks like_ an encoded
 * uuid i.e. it's 16 bytes long.
 * @param value
 * @param prefix
 * @param separator
 * @param strict
 * @returns
 */
export function validId(
  value: unknown,
  prefix: string,
  separator: Separator = defaultSeparator,
  strict: boolean = false
): boolean {
  try {
    if (typeof value !== 'string') {
      return false;
    }
    const parsed = parseId(value, prefix, separator);
    if (!validBase62String(parsed.uuid)) {
      return false;
    }
    return strict ? base62Decode(parsed.uuid).byteLength === UUID4_BYTES : true;
  }
  catch (err) {
    if (err.message.indexOf(E_MALFORMED) > -1) {
      return false;
    }
    throw err;
  }
}
