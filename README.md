# Eye-D [![Test](https://github.com/cmawhorter/eyed/actions/workflows/test.yml/badge.svg)](https://github.com/cmawhorter/eyed/actions/workflows/test.yml)

Generates a uuid v4 that is base62 encoded which makes the result compact, and url friendly. Example: `card_3xs3cYSzXKNI5vhHA203qK`

The values created are as collision resistent as [uuid](https://github.com/uuidjs/uuid) v4 itself, but should not be considered crytographically secure.  Translation: Database ID good. API Key bad.

## Installing

`npm i eyed`

## How it works

It has two dependencies: [uuid](https://github.com/uuidjs/uuid) to create the uuid and [base-x](https://github.com/cryptocoinjs/base-x) to base62 encode.

It takes the bytes from a v4 uuid and encodes them to base62 and optionally prefixes it with a human friendly name.  Since it's just an encoded uuid you can convert it back to bytes and then even format it as a regular uuid string.

## Getting started

```ts
import {
  generateUuid,
  generateId,
  parseId,
  validId,
} from 'eyed';

// uuid creates a base62-encoded uuid
console.log(generateUuid()); // unprefixed. just the base62 encoded uuid "3xs3cYSzXKNI5vhHA203qK"

// generateId adds a prefix to uuid with a default separator
console.log(generateId('card')) // card_3xs3cYSzXKNI5vhHA203qK
console.log(generateId('card', ':')) // card:3xs3cYSzXKNI5vhHA203qK

console.log(parseId('card_3xs3cYSzXKNI5vhHA203qK')) // { prefix: 'card', separator: '_', uuid: '3xs3cYSzXKNI5vhHA203qK' }

console.log(validId('card_3xs3cYSzXKNI5vhHA203qK', 'card')) // true
console.log(validId('card_3', 'card')) // true
console.log(validId('card_+', 'card')) // false
console.log(validId('card_3_2', 'card')) // false
// with strict mode the byte length of the id portion of string is confirmed to be 16 bytes
console.log(validId('card_3', 'card', '_', true)) // false
```

## Shorter or longer IDs

It is possible to generate IDs that are either shorter or longer.  

Be aware that v4 uuids store data in byte 6 and 8. So if you generate a values that have bytes closer to that, you're really increasing your chances of collisions.

## Shorter IDs

In lower volume scenarios all those bytes for a full uuid are probably overkill and you can generate shorter ids like: `generateId('c', '_', 10) // c_1yLlrVRrgH2Um7`

You can use any value 1-16 for number of bytes.  16 is normal.  Going lower than 10 is probably a bad idea unless you know your app can recover from collisions.

## Longer IDs

Nothing exists for this out-of-the-box. Your best bet would be to string IDs together: `generateId('c', '_') + generateUuid(10) // c_6Qcp3K4umtMQSWnc4T8z8V5COBC7B86UaO2Z`

If you don't need the uuid back out, it would be better to generate two shorter ids instead of the one 16 byte and one 10 a above: `generateId('c', '_', 13) + generateUuid(13)`

The second id would have decreased chances of collisions.
