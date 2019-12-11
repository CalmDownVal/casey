import { cases } from './case/index.mjs';

// generate the enum
export const Case = {};
for (let i = 0; i !== cases.length; ++i)
{
	Case[cases[i].name] = i;
}

Object.seal(Case);

// user input validation
export function isValidCase(n)
{
	return typeof n === 'number' && n >= 0 && n < cases.length && Number.isInteger(n);
}
