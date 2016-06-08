'use strict';

const propertyValueAliases = require('unicode-property-value-aliases');

const matchPropertyValue = function(property, value) {
	const valueAliases = propertyValueAliases.get(property);
	if (!valueAliases) {
		throw new Error(`Unknown property: ${ property }`);
	}
	const canonicalValue = valueAliases.get(value);
	if (canonicalValue) {
		return canonicalValue;
	}
	throw new Error(`Unknown value ${ value } for property ${ property }`);
};

module.exports = matchPropertyValue;
