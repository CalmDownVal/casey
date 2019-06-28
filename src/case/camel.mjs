import { composeCaps, splitByCaps } from '../shared.mjs';

export default
{
	pattern : /^(?:[a-z][a-z0-9]*)(?:[A-Z][a-z0-9]*)*$/,
	compose : words => composeCaps(words, false),
	split : splitByCaps,
	splitsAcronyms : true
};
