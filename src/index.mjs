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

	// attempt to restore acronyms
	if (acronyms && acronyms.length !== 0)
	{
		// TODO
		// restoreAcronyms(words, acronyms);
	}

	// produce the output
	return cTo.compose(words);
}

export { Case, detect, convert };
