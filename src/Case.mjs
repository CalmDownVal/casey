import cases from './case/index.mjs';

// generate the enum object
const obj = {};
for (let i = 0; i !== cases.length; ++i)
{
	obj[cases[i].name] = i;
}

Object.seal(obj);

// enumeration user input validation
export function isValidCase(n)
{
	return typeof n === 'number' && n >= 0 && n < cases.length && Number.isInteger(n);
}

export default obj;
