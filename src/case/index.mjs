import CamelCase from './camel.mjs';
import PascalCase from './pascal.mjs';
import SnakeCase from './snake.mjs';
import SnakeCapsCase from './snakecaps.mjs';
import KebabCase from './kebab.mjs';

// the order of these is important for backwards compatibility
// as the final enumeration values depend on it
export default
[
	CamelCase,
	PascalCase,
	SnakeCase,
	SnakeCapsCase,
	KebabCase
];
