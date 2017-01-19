# D

Generates a v4 uuid base62 encoded e.g. `card_3xs3cYSzXKNI5vhHA203qK`

```js
// npm install cmawhorter/D --save
var D = require('D');

// uuid creates a base62-encoded uuid
D.uuid(); // "3xs3cYSzXKNI5vhHA203qK" from card_3xs3cYSzXKNI5vhHA203qK

// id adds a prefix to uuid with a default separator
D.id('card') // card_3xs3cYSzXKNI5vhHA203qK
D.id('card', ':') // card:3xs3cYSzXKNI5vhHA203qK
// change the default
D.separator = ':';
D.id('card') // card:3xs3cYSzXKNI5vhHA203qK

// create 
var CardId = D.create('card') // or D.create('card', ':')
var UserId = D.create('usr')
CardId() // card_3xs3cYSzXKNI5vhHA203qK
UserId() // usr_5jtCjUn51hAA7pBcWECW3S
```
