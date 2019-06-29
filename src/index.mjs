import Case from './Case.mjs';
import cases from './case/index.mjs';

function assertPhrase(phrase)
{
	if (!phrase || typeof phrase !== 'string')
	{
		throw new Error('invalid phrase, non-empty string expected');
	}
}

function detect(phrase)
{
	assertPhrase(phrase);
	for (const caseKey in cases)
	{
		if (cases[caseKey].pattern.test(phrase))
		{
			// maps stringify their keys
			return Number(caseKey);
		}
	}
	return null;
}

function asMap(tokens)
{
	const map = {};
	for (let i = 0; i < tokens.length; ++i)
	{
		const acronym = tokens[i];
		if (acronym.length > 1)
		{
			map[acronym.toLowerCase()] = true;
		}
	}
	return map;
}

function joinAcronyms(words, acronyms)
{
	// map acronyms first for faster lookups
	const map = asMap(acronyms);

	// find acronyms
	let buffer = '';
	for (let i = 0; i <= words.length; ++i)
	{
		const word = words[i];
		if (word && word.length === 1)
		{
			buffer += word;
		}
		else if (buffer)
		{
			const length = buffer.length;
			for (let l = length; l > 1; --l)
			{
				const until = length - l;
				for (let j = 0; j <= until; ++j)
				{
					const substr = buffer.slice(j, j + l);
					if (map[substr])
					{
						const anchor = i - length + j;
						words.splice(anchor, l, substr);
						i -= length + 1;
						l = 0;
						break;
					}
				}
			}
			buffer = '';
		}
	}
}

function splitAcronyms(words, acronyms)
{
	// map acronyms first for faster lookups
	const map = asMap(acronyms);

	// scan for acronyms
	for (let i = 0; i < words.length; ++i)
	{
		const word = words[i];
		if (map[word])
		{
			const args = [ i, 1 ];
			for (let j = 0; j < word.length; ++j)
			{
				args.push(word[j]);
			}
			Array.prototype.splice.apply(words, args);
		}
	}
}

function convert(phrase, options)
{
	assertPhrase(phrase);

	// unify arguments
	if (typeof options === 'number')
	{
		options = { caseTo : options };
	}

	// validate input
	let { caseFrom, caseTo, acronyms } = options;
	if (caseFrom === undefined)
	{
		caseFrom = detect(phrase);
		if (caseFrom === null)
		{
			throw new Error('could not detect the input case');
		}
	}

	const cFrom = cases[caseFrom];
	if (!cFrom)
	{
		throw new Error('invalid case caseFrom');
	}

	const cTo = cases[caseTo];
	if (!cTo)
	{
		throw new Error('invalid case caseTo');
	}

	// split into lowercased word list
	const words = cFrom.split(phrase);

	// treat acronyms when provided
	if (cFrom.splitsAcronyms !== cTo.splitsAcronyms && acronyms && acronyms.length !== 0)
	{
		(cTo.splitsAcronyms ? splitAcronyms : joinAcronyms)(words, acronyms);
	}

	// produce the output
	return cTo.compose(words);
}

export { Case, detect, convert };
