// conversion between upper and lowercase is adding/subbtracting 32 because:
// ('a' = 97) - ('A' = 65) = 32

// detection of upper/lower is a simple range check
// lower: 'a' = 97, 'z' = 122
// upper: 'A' = 65, 'Z' = 90

function isLower(c)
{
	return c >= 97 && c <= 122;
}

function isUpper(c)
{
	return c >= 65 && c <= 90;
}

function lower(c)
{
	return isUpper(c) ? c + 32 : c;
}

function upper(c)
{
	return isLower(c) ? c - 32 : c;
}

function capitalize(word)
{
	return String.fromCharCode(upper(word.charCodeAt(0))) + word.slice(1);
}


export function splitByCaps(phrase)
{
	const length = phrase.length;
	const words = [];

	let i = 1;
	let anchor = 1;
	let word = String.fromCharCode(lower(phrase.charCodeAt(0)));

	while (i < length)
	{
		const c = phrase.charCodeAt(i);
		if (isUpper(c))
		{
			words.push(anchor === i
				? word
				: word + phrase.slice(anchor, i));

			anchor = i + 1;
			word = String.fromCharCode(c + 32); // convert to lower
		}

		++i;
	}

	words.push(anchor === i
		? word
		: word + phrase.slice(anchor, i));

	return words;
}

export function splitBySymbol(phrase, symbol)
{
	const length = phrase.length;
	const words = [];

	let i = 0;
	let anchor = 0;

	while (i <= length)
	{
		if (i === length || phrase[i] === symbol)
		{
			if (anchor !== i)
			{
				words.push(phrase.slice(anchor, i).toLowerCase());
			}

			anchor = i + 1;
		}

		++i;
	}

	return words;
}

export function composeCaps(words, capitalizeFirst)
{
	let result = '';
	for (let i = capitalizeFirst ? 0 : 1; i < words.length; ++i)
	{
		result += capitalize(words[i]);
	}
	return capitalizeFirst ? result : words[0] + result;
}
