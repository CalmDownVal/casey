export declare enum Case
{
	CAMEL = 0,
	PASCAL = 1,
	SNAKE = 2,
	SNAKE_CAPS = 3,
	KEBAB = 4
}

interface IConvertOptions
{
	acronyms?: string[];
	caseFrom?: Case;
	caseTo: Case;
}

/**
 * detects the case of the input phrase
 * @throws when phrase is empty or not a string
 */
export declare function detect(phrase: string): Case;

/**
 * splits the input phrase into an array of words
 * case will be auto-detected if not provided
 * @throws when phrase is empty or not a string
 * @throws when case cannot be detected
 */
export declare function split(phrase: string, caseFrom?: Case): string[];

/**
 * joins the word list into a phrase in the specified case
 */
export declare function join(words: string[], caseTo: Case): string;

/**
 * converts the phrase into another case
 * current case is auto-detected
 * @throws when phrase is empty or not a string
 * @throws when current case cannot be detected
 */
export declare function convert(phrase: string, caseTo: Case): string;

/**
 * converts the phrase into another case
 * @throws when phrase is empty or not a string
 * @throws when current case cannot be detected
 */
export declare function convert(phrase: string, options: IConvertOptions): string;

/**
 * tests whether the phrase is in the specified case
 * @throws when phrase is empty or not a string
 * @throws when case is invalid
 */
export declare function is(phrase: string, caseIs: Case): boolean;
