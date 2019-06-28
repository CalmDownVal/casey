import { splitBySymbol } from '../shared.mjs';

export default
{
	pattern : /^(?:[a-z][a-z0-9]*)(?:-+[a-z][a-z0-9]*)*-*$/,
	compose : words => words.join('-'),
	split : phrase => splitBySymbol(phrase, '-'),
	splitsAcronyms : false
};
