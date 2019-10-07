import { composeCaps, splitByCaps } from '../shared.mjs';

export default
{
	name : 'PASCAL',
	pattern : /^(?:[A-Z][a-z0-9]*)+$/,
	join : words => composeCaps(words, true),
	split : splitByCaps,
	splitsAcronyms : true
};
