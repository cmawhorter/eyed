# EyeD [![Build Status](https://travis-ci.org/cmawhorter/eyed.svg?branch=master)](http://travis-ci.org/cmawhorter/eyed)

Generates a v4 uuid base62 encoded e.g. `card_3xs3cYSzXKNI5vhHA203qK`

## Installing

`npm install eyed --save`

## Getting started

```js
// npm install cmawhorter/D --save
var EyeD = require('eyed');

// uuid creates a base62-encoded uuid
EyeD.uuid(); // "3xs3cYSzXKNI5vhHA203qK" from card_3xs3cYSzXKNI5vhHA203qK

// id adds a prefix to uuid with a default separator
EyeD.id('card') // card_3xs3cYSzXKNI5vhHA203qK
EyeD.id('card', ':') // card:3xs3cYSzXKNI5vhHA203qK
// change the default
EyeD.separator = ':';
EyeD.id('card') // card:3xs3cYSzXKNI5vhHA203qK

// create 
var CardId = EyeD.create('card') // or EyeD.create('card', ':')
var UserId = EyeD.create('usr')
CardId() // card_3xs3cYSzXKNI5vhHA203qK
UserId() // usr_5jtCjUn51hAA7pBcWECW3S
```
