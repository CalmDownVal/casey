# Casey

**This module uses the ES modules feature and requires Node v8.15.0+.
Please refer to [Node's documentation](https://nodejs.org/api/esm.html#esm_enabling) to read
more on how to enable this functionality in your environment.**

A case detection + conversion library.

## Installation

```bash
npm i --save @calmdownval/casey
```

## Usage

### `detect(phrase: string): Case | null`

Detects case in the phrase and returns a value from the `Case` enum if successfully identified,
returns null otherwise.

```js
import { detect, Case } from '@calmdownval/casey';

if (detect('thisIsCamelCase') === Case.CAMEL)
{
    // ...
}
```

### `convert(phrase: string, options: object | Case): string`

Converts a phrase between cases. The options argument can be an object with the following options:

- `caseTo: Case` - Required. The case to convert the phrase into.
- `caseFrom?: Case` - If provided, phrase will be treated as a string in the specified case.
If omitted the function will attempt to auto-detect the input case. This will throw when
auto-detection fails.
- `acronyms?: string[]` - Allows to preserve acronyms across cases (more info below).

You can also pass just a member of the `Case` enum instead of the options object. In such case
the argument is treated as the `caseTo` option.

```js
import { convert, Case } from '@calmdownval/casey';

// returns: 'some-phrase'
convert('SomePhrase', Case.KEBAB);
```

### `split(phrase: string, caseFrom?: Case): string[]`

Splits a phrase into an array of words. This array is always lowercased. If the second argument
is omitted the function will attempt to auto-detect the input case. This throw throw when
auto-detection fails.

### `join(words: string[], caseTo: Case): string`

Joins an array of words into a single phrase in the specified case.

### Acronym Preservation

When converting between pascal- or camel-case and one of the dash or underscore delimited cases
acronyms become a problem since usually acronyms are written in all-caps when using pascal-
or camel-case but are written together when using the delimited cases.

```js
import { convert, Case } from '@calmdownval/casey';

// 1) returns 'FftHelper'
convert('fft-helper', Case.PASCAL);

// 2) returns 'f-f-t-helper'
convert('FFTHelper', Case.KEBAB);

// 3) returns 'FFTHelper'
convert('fft-helper', {
    caseTo: Case.PASCAL,
    acronyms: [ 'fft' ]
});

// 4) returns 'fft-helper'
convert('FFTHelper', {
    caseTo: Case.KEBAB,
    acronyms: [ 'fft' ]
});
```

The problem is perhaps not very apparent in the first example, but notice we do lose information
about 'FFT' being an acronym during the conversion. The second example better shows an undesirable
output caused by an acronym. Examples 3) and 4) showcase the usage of the options object and its
`acronyms` option to overcome this issue. Please note that all acronyms in this array MUST
be lowercase for this to function properly.

## Supported Cases

| Case              | Example      |
|-------------------|--------------|
| `Case.CAMEL`      | `camelCase`  |
| `Case.PASCAL`     | `PascalCase` |
| `Case.SNAKE`      | `snake_case` |
| `Case.SNAKE_CAPS` | `SNAKE_CAPS` |
| `Case.KEBAB`      | `kebab-case` |
