import test from 'ava';
import matchPropertyValue from '../index.js';

test(t => {
	t.throws(
		() => matchPropertyValue('blk', 'Alphabetic_PF'),
		Error
	);
	t.throws(
		() => matchPropertyValue('Block', 'invalid block value'),
		Error
	);
	t.deepEqual(
		matchPropertyValue('ASCII', 'N'),
		'No'
	);
	t.deepEqual(
		matchPropertyValue('Block', 'Alphabetic_PF'),
		'Alphabetic_Presentation_Forms'
	);
	t.deepEqual(
		matchPropertyValue('General_Category', 'L'),
		'Letter'
	);
	t.deepEqual(
		matchPropertyValue('General_Category', 'Lu'),
		'Uppercase_Letter'
	);
	t.deepEqual(
		matchPropertyValue('Script', 'Xpeo'),
		'Old_Persian'
	);
	t.deepEqual(
		matchPropertyValue('Script_Extensions', 'Xpeo'),
		'Old_Persian'
	);
});
