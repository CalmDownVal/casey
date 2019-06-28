/* eslint-env mocha */
import { strictEqual } from 'assert';
import { stringify } from '@calmdownval/enums';
import { Case, convert } from '../src/index.mjs';
import fixture from './fixture.mjs';

describe('convert', () =>
{
	for (let i = 0; i < fixture.length; i += 2)
	{
		const caseFrom = fixture[i];
		const phraseFrom = fixture[i + 1];

		for (let j = 0; j < fixture.length; j += 2)
		{
			if (j === i)
			{
				continue;
			}

			const caseTo = fixture[j];
			const phraseTo = fixture[j + 1];

			it(`should convert from ${stringify(Case, caseFrom)} to ${stringify(Case, caseTo)}`, () =>
			{
				strictEqual(convert(phraseFrom, { caseFrom, caseTo }), phraseTo);
			});
		}
	}
});
