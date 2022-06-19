import { baseFontSize, fontSizes, headingFont, primaryFont } from './fonts.const';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions | (() => TypographyOptions) = {
	fontFamily: primaryFont,
	htmlFontSize: baseFontSize,
	h1: {
		fontFamily: headingFont,
		fontSize: fontSizes.xxxxl,
		fontWeight: 700,
		fontStyle: 'normal',
		lineHeight: 1.21,
		letterSpacing: '3px',
	},
	h2: {
		fontFamily: headingFont,
		fontSize: fontSizes.xxxl,
		fontWeight: 700,
		fontStyle: 'normal',
		lineHeight: 1.22,
	},
	h3: {
		fontFamily: headingFont,
		fontSize: fontSizes.xxl,
		fontWeight: 700,
		fontStyle: 'normal',
		lineHeight: 1.31,
	},
	h4: {
		fontFamily: headingFont,
		fontSize: fontSizes.xl,
		fontWeight: 700,
		fontStyle: 'normal',
		lineHeight: 1.43,
	},
	h5: {
		fontFamily: headingFont,
		fontSize: fontSizes.lg,
		fontWeight: 700,
		fontStyle: 'normal',
		lineHeight: 1.42,
	},
	h6: {
		fontFamily: headingFont,
		fontSize: fontSizes.md,
		fontWeight: 700,
		fontStyle: 'normal',
		lineHeight: 1.78,
	},
	subtitle1: {
		fontSize: fontSizes.md,
		fontWeight: 500,
		fontStyle: 'normal',
		lineHeight: 1.33,
	},
	subtitle2: {
		fontSize: fontSizes.base,
		fontWeight: 500,
		fontStyle: 'normal',
		lineHeight: 1.63,
	},
	body1: {
		fontSize: fontSizes.base,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: 1.63,
	},
	body2: {
		fontSize: fontSizes.sm,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: 1.71,
	},
	button: {
		fontSize: fontSizes.base,
		fontWeight: 500,
	},
	caption: {
		fontSize: fontSizes.sm,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: 1.5,
	},
	overline: {
		fontSize: fontSizes.xs,
		fontWeight: 500,
		fontStyle: 'normal',
		lineHeight: 1.33,
		textTransform: 'none',
	},
};
