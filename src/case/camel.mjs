import { composeCaps, splitByCaps } from '../shared.mjs';

export const CamelCase =
{
	name : 'CAMEL',
	pattern : /^(?:[a-z][a-z0-9]*)(?:[A-Z][a-z0-9]*)*$/,
	join : words => composeCaps(words, false),
	split : splitByCaps,
	splitsAcronyms : true
};
