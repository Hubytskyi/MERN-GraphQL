import { createTheme, PaletteOptions } from '@mui/material/styles';
import breakpoints from './breakpoints.const';
import shadows from './shadows.const';
import paletteLight from './palette-light.const';
import { typography } from './typography.const';

const theme = createTheme({
	breakpoints: {
		values: {
			xs: breakpoints.xs,
			sm: breakpoints.sm,
			md: breakpoints.md,
			lg: breakpoints.lg,
			xl: breakpoints.xl,
		},
	},
	palette: paletteLight as PaletteOptions,

	spacing: (factor: number) => `${0.25 * factor}rem`,

	typography: typography,

	shadows: [
		'none',
		shadows['1'],
		shadows['2'],
		shadows['3'],
		shadows['4'],
		shadows['5'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
		shadows['6'],
	],
});

export default theme;
