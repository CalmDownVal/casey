import { splitBySymbol } from '../shared.mjs';

export default
{
	pattern : /^(?:[a-z][a-z0-9]*)(?:_+[a-z][a-z0-9]*)*_*$/,
	compose : words => words.join('_'),
	split : phrase => splitBySymbol(phrase, '_')
};
