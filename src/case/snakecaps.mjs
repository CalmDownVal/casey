import { splitBySymbol } from '../shared.mjs';

export default
{
	name : 'SNAKE_CAPS',
	pattern : /^(?:[A-Z][A-Z0-9]*)(?:_+[A-Z][A-Z0-9]*)*_*$/,
	join : words =>
	{
		let result = '';
		for (let i = 0; i < words.length; ++i)
		{
			result += (i ? '_' : '') + words[i].toUpperCase();
		}
		return result;
	},
	split : phrase => splitBySymbol(phrase, '_'),
	splitsAcronyms : false
};
