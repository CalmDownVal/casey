import CamelCase from './camel.mjs';
import PascalCase from './pascal.mjs';
import SnakeCase from './snake.mjs';
import SnakeCapsCase from './snakecaps.mjs';
import KebabCase from './kebab.mjs';
import Case from '../Case.mjs';

export default
{
	[Case.CAMEL] : CamelCase,
	[Case.PASCAL] : PascalCase,
	[Case.SNAKE] : SnakeCase,
	[Case.SNAKE_CAPS] : SnakeCapsCase,
	[Case.KEBAB] : KebabCase
};
