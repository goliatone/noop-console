# Noop Console

noop console, replace console method calls with noops.

Useful to silence a module logging during testing.

## Getting Started
Install the module with: `npm install noop-console`

## Examples

`my-module.js`:
```js
function MyModule(){}
MyModule.prototype.logger = console;
```

`test.js`:
```javascript
var MyModule = require('my-module');
MyModule.prototype.logger = require('noop-console');
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2016-09-02 v.0.1.0: Initial release

## License
Copyright (c) 2016 goliatone  
Licensed under the MIT license.
