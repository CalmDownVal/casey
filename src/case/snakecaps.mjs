import { splitBySymbol } from '../shared.mjs';

export default
{
	pattern : /^(?:[A-Z][A-Z0-9]*)(?:_+[A-Z][A-Z0-9]*)*_*$/,
	split : phrase => splitBySymbol(phrase, '_'),
	compose : words =>
	{
		let result = '';
		for (let i = 0; i < words.length; ++i)
		{
			result += (i ? '_' : '') + words[i].toUpperCase();
		}
		return result;
	}
};
