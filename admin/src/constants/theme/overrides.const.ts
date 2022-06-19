import { alpha } from '@mui/material';
import shadows from './shadows.const';
import { fontSizes } from './fonts.const';
import { paletteLight } from './palette-light.const';

export const components = {
	MuiContainer: {
		styleOverrides: {
			root: {
				boxSizing: 'border-box',
				paddingLeft: '15px !important',
				paddingRight: '15px !important',

				'@media (min-width: 1168px)': {
					'&.container-bordered': {
						borderLeft: `1px solid ${paletteLight.grey?.[100]}`,
						borderRight: `1px solid ${paletteLight.grey?.[100]}`,
					},

					'&.container-divided': {
						position: 'relative',

						'&::before': {
							content: '\'\'',
							width: 1,
							height: '100%',
							position: 'absolute',
							left: '50%',
							top: 0,
							background: paletteLight.grey?.[100],
						},
					},
				},

				'&.h-100': {
					height: '100%',
				},
			},
			disableGutters: {
				paddingLeft: '0 !important',
				paddingRight: '0 !important',
			},
		},
	},

	MuiButton: {
		styleOverrides: {
			root: {
				fontSize: fontSizes.sm,
				padding: '8px 20px',
				textTransform: 'none',
				lineHeight: 1.14,
				boxShadow: shadows['0'],
				borderRadius: 23,

				'&:hover': {
					boxShadow: shadows['1'],
				},

				'&:active': {
					boxShadow: shadows['1'],
				},

				'&:disabled': {
					pointerEvents: 'none',
					opacity: '0.65',
				},

				'&.MuiButton-sizeLarge': {
					padding: '15px 25px',
					fontSize: fontSizes.base,
					lineHeight: 1,
				},
			},

			contained: {
				boxShadow: shadows['0'],
				backgroundColor: paletteLight.grey['100'],

				'&:hover': {
					boxShadow: shadows['1'],
					backgroundColor: paletteLight.grey['100'],
				},

				'&:active': {
					boxShadow: shadows['1'],
				},
			},

			containedPrimary: {
				backgroundColor: paletteLight.primary.main,
				'&:hover': {
					backgroundColor: paletteLight.primary.light,
				},
			},
		},
	},

	MuiIconButton: {
		styleOverrides: {
			root: {
				color: paletteLight.grey['500'],
				padding: '8px',

				'&.MuiIconButton-sizeSmall': {
					padding: '4px',
				},

				'&.Mui-disabled': {
					color: paletteLight.grey['300'],
				},

				'&:hover': {
					backgroundColor: alpha(paletteLight.grey['400'], 0.15),
				},

				'&:active': {
					backgroundColor: alpha(paletteLight.grey['400'], 0.3),
				},
			},
		},
	},


	MuiInput: {
		styleOverrides: {
			root: {
				color: paletteLight.textLight.primary,
				fontWeight: 600,
				placeholder: {
					color: paletteLight.textLight.primary,
				},
			},
			underline: {
				'&:before': {
					borderBottom: `1px solid ${paletteLight.grey['500']}`,
				},

				'&:hover:not(.Mui-disabled):before': {
					borderBottom: `1px solid ${paletteLight.grey['400']}`,
				},

				'&:after': {
					borderBottom: `1px solid ${paletteLight.common.white}`,
				},
			},
		},
	},

	MuiSelect: {
		styleOverrides: {
			select: {
				'&:focus': {
					backgroundColor: 'transparent',
				},
			},
		},
	},

	MuiMenuItem: {
		styleOverrides: {
			root: {
				'&.Mui-selected': {
					color: paletteLight.secondary,
				},
			},
		},
	},

	MuiPaper: {
		styleOverrides: {
			root: {
				'&.MuiMenu-paper': {
					boxShadow: shadows[2],
				},
			},
		},
	},

	MuiFormHelperText: {
		styleOverrides: {
			root: {
				position: 'absolute',
				bottom: '-25px',
			},
		},
	},

	MuiBreadcrumbs: {
		styleOverrides: {
			separator: {
				fontWeight: 600,
			},
		},
	},
};
