import cases from './case/index.mjs';
import Case, { isValidCase } from './Case.mjs';

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
function assertCase(_case)
{
	if (!isValidCase(_case))
	{
		throw new Error('invalid caseFrom, expected a member of the Case enum');
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
function getCase(phrase, _case)
{
	if (_case !== undefined && _case !== null)
	{
		assertCase(_case);
	}
	else if (!(_case = detectCase(phrase)))
	{
		throw new Error('could not auto-detect the case');
	}

	return _case;
}

/**
 * detects the case of the input phrase
 * @param {string} phrase
 * @throws when phrase is empty or not a string
 */
export function detect(phrase)
{
	assertPhrase(phrase);
	return detectCase(phrase);
}

/**
 * splits the input phrase into an array of words
 * case will be auto-detected if not provided
 * @param {string} phrase
 * @param {Case?} caseFrom
 */
export function split(phrase, caseFrom)
{
	assertPhrase(phrase);
	return cases[getCase(phrase, caseFrom)].split(phrase);
}

/**
 * joins the word list into a phrase in the specified case
 * @param {string} phrase
 * @param {Case} caseTo
 */
export function join(words, caseTo)
{
	assertCase(caseTo);
	for (const word of words)
	{
		assertPhrase(word);
	}
	return cases[caseTo].join(words);
}

/**
 * converts the phrase into another case
 * @param {string} phrase
 * @param {string[]?} options.acronyms
 * @param {Case?} options.caseFrom
 * @param {Case} options.caseTo
 */
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

// additional exports
export { Case };
export default { Case, detect, split, join, convert };
