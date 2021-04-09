# Eye-D [![Test](https://github.com/cmawhorter/eyed/actions/workflows/test.yml/badge.svg)](https://github.com/cmawhorter/eyed/actions/workflows/test.yml)

Generates a uuid v4 in base62 encoded format e.g. `card_3xs3cYSzXKNI5vhHA203qK`.

## Installing

`npm i eyed`

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
## How it works

It has two dependencies: [uuid](https://github.com/uuidjs/uuid) to create the uuid and [base-x](https://github.com/cryptocoinjs/base-x) to base62 encode.
