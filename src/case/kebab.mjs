import { splitBySymbol } from '../shared.mjs';

export const KebabCase =
{
	name : 'KEBAB',
	pattern : /^(?:[a-z][a-z0-9]*)(?:-+[a-z][a-z0-9]*)*-*$/,
	join : words => words.join('-'),
	split : phrase => splitBySymbol(phrase, '-'),
	splitsAcronyms : false
};
