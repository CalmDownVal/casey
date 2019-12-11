/* eslint-env mocha */
import { strictEqual } from 'assert';
import { stringify } from '@calmdownval/enums';
import { Case, detect, is } from '../src/index.mjs';
import fixture from './fixture.mjs';

describe('detect', () =>
{
	for (let i = 0; i < fixture.length; i += 2)
	{
		const expect = fixture[i];
		const phrase = fixture[i + 1];

		it(`should detect ${stringify(Case, expect)}`, () =>
		{
			strictEqual(detect(phrase), expect);
		});
	}
});

describe('is', () =>
{
	for (let i = 0; i < fixture.length; i += 2)
	{
		const phrase = fixture[i + 1];
		const correctCase = fixture[i];
		it(`should validate ${stringify(Case, correctCase)} inputs`, () =>
		{
			strictEqual(is(phrase, correctCase), true);
		});

		const wrongCase = fixture[(i + 2) % fixture.length];
		it(`should detect wrong input for ${stringify(Case, wrongCase)}`, () =>
		{
			strictEqual(is(phrase, wrongCase), false);
		});
	}
});
