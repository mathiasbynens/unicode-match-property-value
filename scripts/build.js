'use strict';

const propertyAliases = require('unicode-property-aliases-ecmascript');
const valueAliases = require('unicode-property-value-aliases');
const jsesc = require('jsesc');

const propertyToValueAliases = new Map(valueAliases);

for (const [property, values] of valueAliases) {
	for (const [valueAlias, value] of values) {
		values.set(value, value);
	}
}

const output = `module.exports = ${
	jsesc(propertyToValueAliases, {
		'compact': false
	})
};\n`;
require('fs').writeFileSync('data/mappings.js', output);
