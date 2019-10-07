/* eslint-env mocha */
import { strictEqual } from 'assert';
import { Case, convert } from '../src/index.mjs';

describe('acronyms', () =>
{
	it('should not affect unknown acronyms', () =>
	{
		strictEqual(
			convert('ThisLGTM', { caseTo : Case.KEBAB, acronyms : [ 'omg' ] }),
			'this-l-g-t-m');
	});

	it('should recognize known acronyms (join)', () =>
	{
		strictEqual(
			convert('ThisLGTM', { caseTo : Case.KEBAB, acronyms : [ 'lgtm' ] }),
			'this-lgtm');
	});

	it('should recognize known acronyms (split)', () =>
	{
		strictEqual(
			convert('this-lgtm', { caseTo : Case.PASCAL, acronyms : [ 'lgtm' ] }),
			'ThisLGTM');
	});
});
