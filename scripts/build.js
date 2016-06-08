'use strict';

const binaryProperties = require('unicode-9.0.0').Binary_Property;
const propertyAliases = require('unicode-property-aliases');
const valueAliases = require('unicode-property-value-aliases');
const jsesc = require('jsesc');

const propertyToValueAliases = new Map();
for (const [propertyAlias, canonicalProperty] of propertyAliases.entries()) {
	// Handle the property value aliases for this property.
	const valueAliasMappings = valueAliases.get(canonicalProperty);
	// { property value alias => canonical property value }
	const aliasToValue = new Map();
	if (valueAliasMappings) {
		for (const [valueAlias, canonicalValue] of valueAliasMappings.entries()) {
			aliasToValue.set(valueAlias, canonicalValue);
			aliasToValue.set(canonicalValue, canonicalValue);
		}
	}
	// { canonical property => { property value alias => canonical property value } }
	if (aliasToValue.size) {
		propertyToValueAliases.set(canonicalProperty, aliasToValue);
	} else {
		console.log(`No property value aliases for ${ canonicalProperty }`);
	}
}

const binaryPropertyValueAliases = propertyToValueAliases.get('ASCII_Hex_Digit');
// `ASCII`, `Any`, and `Assigned` are the only binary properties that are not
// mentioned in `PropertyValueAliases.txt`. ಠ_ಠ
const additionalMappings = new Map([
	['ASCII', binaryPropertyValueAliases],
	['Any', binaryPropertyValueAliases],
	['Assigned', binaryPropertyValueAliases]
]);

const allMappings = new Map([
	...additionalMappings,
	...propertyToValueAliases
])

const output = `module.exports = ${
	jsesc(allMappings, {
		'compact': false
	})
};\n`;
require('fs').writeFileSync('data/mappings.js', output);
