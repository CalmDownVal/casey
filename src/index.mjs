import { cases } from './case/index.mjs';
import { Case, isValidCase } from './Case.mjs';

/**
 * asserts phrase is a non-empty string
 */
function assertPhrase(phrase)
{
	if (!(phrase && typeof phrase === 'string'))
	{
		throw new Error('invalid phrase, non-empty string expected');
	}
}

/**
 * asserts case is a member of the Case enum
 */
function assertCase(caseIn)
{
	if (!isValidCase(caseIn))
	{
		throw new Error('invalid case, expected a member of the Case enum');
	}
}

/**
 * joins acronyms matching the map scattered in the words list back together
 */
function joinAcronyms(words, acronymMap)
{
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
					if (acronymMap[substr])
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

/**
 * scatters acronyms matching the map into single-letter words
 */
function splitAcronyms(words, acronymMap)
{
	for (let i = 0; i < words.length; ++i)
	{
		const word = words[i];
		if (acronymMap[word])
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

/**
 * detects the case of the input phrase
 * phrase MUST be a valid non-empty string
 */
function detectCase(phrase)
{
	for (let i = 0; i !== cases.length; ++i)
	{
		if (cases[i].pattern.test(phrase))
		{
			return i;
		}
	}
	return null;
}

/**
 * validates the given case or falls back to auto-detection if not provided
 * phrase MUST be a valid non-empty string
 * @throws when case cannot be determined
 */
function getCase(phrase, caseIn)
{
	if (caseIn !== undefined && caseIn !== null)
	{
		assertCase(caseIn);
	}
	else if (!(caseIn = detectCase(phrase)))
	{
		throw new Error('could not auto-detect the case');
	}

	return caseIn;
}

export function detect(phrase)
{
	assertPhrase(phrase);
	return detectCase(phrase);
}

export function split(phrase, caseFrom)
{
	assertPhrase(phrase);
	return cases[getCase(phrase, caseFrom)].split(phrase);
}

export function join(words, caseTo)
{
	assertCase(caseTo);
	for (const word of words)
	{
		assertPhrase(word);
	}
	return cases[caseTo].join(words);
}

export function convert(phrase, options)
{
	assertPhrase(phrase);

	// allow passing caseTo directly
	if (typeof options === 'number')
	{
		options = { caseTo : options };
	}

	// validate input
	let { caseFrom, caseTo, acronyms } = options;
	assertCase(caseTo);
	caseFrom = getCase(phrase, caseFrom);

	// split into lowercased word list
	const cFrom = cases[caseFrom];
	const cTo = cases[caseTo];
	const words = cFrom.split(phrase);

	// treat acronyms when provided
	if (Array.isArray(acronyms) && cFrom.splitsAcronyms !== cTo.splitsAcronyms)
	{
		const acronymMap = {};
		let validCount = 0;
		for (const acronym of acronyms)
		{
			if (acronym.length > 1)
			{
				acronymMap[acronym.toLowerCase()] = true;
				++validCount;
			}
		}

		if (validCount !== 0)
		{
			(cTo.splitsAcronyms ? splitAcronyms : joinAcronyms)(words, acronymMap);
		}
	}

	// produce the output
	return cTo.join(words);
}

export function is(phrase, caseIs)
{
	assertPhrase(phrase);
	assertCase(caseIs);
	return cases[caseIs].pattern.test(phrase);
}

// additional export
export { Case };
