import { splitBySymbol } from '../shared.mjs';

export const SnakeCase =
{
	name : 'SNAKE',
	pattern : /^(?:[a-z][a-z0-9]*)(?:_+[a-z][a-z0-9]*)*_*$/,
	join : words => words.join('_'),
	split : phrase => splitBySymbol(phrase, '_'),
	splitsAcronyms : false
};
