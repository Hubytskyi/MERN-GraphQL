import colors from './colors.const';

export const paletteLight = {
	type: 'light',
	common: {
		black: colors.black,
		white: colors.white,
	},
	primary: {
		light: colors.primary['400'],
		main: colors.primary['500'],
		dark: colors.primary['700'],
		lightRed: colors.primary['100'],
	},
	secondary: {
		main: colors.secondary,
		light: colors.white,
	},
	error: {
		main: colors.error,
	},
	warning: {
		main: colors.warning,
	},
	info: {
		main: colors.info,
	},
	success: {
		main: colors.success,
	},
	grey: {
		50: colors.grey['50'],
		100: colors.grey['100'],
		200: colors.grey['200'],
		300: colors.grey['300'],
		400: colors.grey['400'],
		500: colors.grey['500'],
		700: colors.grey['700'],
		900: colors.grey['900'],
		A100: colors.grey['300'],
		A200: colors.grey['400'],
		A400: colors.black,
		A700: colors.black,
	},
	divider: colors.grey[100],
	contrastThreshold: 3,
	tonalOffset: 0,
	background: {
		paper: colors.white,
		default: colors.white,
	},
	text: {
		primary: colors.grey['700'],
		secondary: colors.black,
	},
	textLight: {
		primary: colors.white,
		secondary: colors.grey['50'],
	},
	textBg: {
		light: colors.textBg['300'],
		main: colors.textBg['400'],
	},
	quantuvis: {
		light: colors.quantuvis['300'],
		main: colors.quantuvis['400'],
	},
	his: {
		light: colors.his['300'],
		main: colors.his['400'],
	},
	lumigrow: {
		light: colors.lumigrow['300'],
		main: colors.lumigrow['400'],
	},
	fangage: {
		main: colors.fangage['400'],
	},
	daiichi: {
		main: colors.daiichi['400'],
	},
	link: {
		main: colors.link['400'],
	},
};

export default paletteLight;
