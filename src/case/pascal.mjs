import { composeCaps, splitByCaps } from '../shared.mjs';

export default
{
	pattern : /^(?:[A-Z][a-z0-9]*)+$/,
	compose : words => composeCaps(words, true),
	split : splitByCaps,
	splitsAcronyms : true
};
