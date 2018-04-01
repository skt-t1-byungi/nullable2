# nullable2
A nullable implementation. Inspired by Kotlin.

[![npm](https://img.shields.io/npm/v/nullable2.svg?style=flat-square)](https://www.npmjs.com/package/nullable2)
[![npm](https://img.shields.io/npm/dt/nullable2.svg?style=flat-square)](https://www.npmjs.com/package/nullable2)

## Install
```sh
yarn add nullable2
```

## Usage
#### Before
```js
const item = items.findOrNull(id);
const child = item && item.getChildOrNull();
const value = child && child.values && child.values.getValue(param)
```
#### After
```js
const nullable = require('nullable2')

const value = nullable(items, v => v
  .findOrNull(id)
  .getChildOrNull()
  .values
  .getValue(param))
```

## Related
- [tc39/proposal-optional-chaining](https://github.com/tc39/proposal-optional-chaining)
- [ES6 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## License

MIT
