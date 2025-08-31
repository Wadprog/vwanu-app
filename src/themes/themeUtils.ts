import { createTailwindFirstTheme } from './tailwindFirstTheme'

/**
 * Creates app theme using Tailwind colors as the single source of truth
 * @param isDarkMode - Whether dark mode is active
 * @param additionalColors - Additional colors to merge (optional, for backwards compatibility)
 * @returns Complete theme object for UI Kitten
 */
export const createAppTheme = (
  isDarkMode: boolean /*additionalColors?: object*/
) => {
  // Use Tailwind-first theme as the base
  const baseTheme = createTailwindFirstTheme(isDarkMode)

  //   // Merge with additional colors if provided (for backwards compatibility)
  //   if (additionalColors) {
  //     return {
  //       ...baseTheme,
  //       ...additionalColors,
  //     }
  //   }

  return baseTheme
}

/**
 * Theme color tokens for easy access in components
 * These correspond to the custom theme tokens
 */
export const themeTokens = {
  background: {
    primary: 'background-basic-color-1',
    secondary: 'background-basic-color-2',
    tertiary: 'background-basic-color-3',
    elevated: 'background-basic-color-4',
  },
  text: {
    primary: 'text-basic-color',
    secondary: 'text-hint-color',
    disabled: 'text-disabled-color',
    control: 'text-control-color',
    alternate: 'text-alternate-color',
  },
  border: {
    subtle: 'border-basic-color-1',
    default: 'border-basic-color-2',
    prominent: 'border-basic-color-3',
    active: 'border-basic-color-4',
    focus: 'border-basic-color-5',
  },
  status: {
    success: 'color-success-500',
    info: 'color-info-500',
    warning: 'color-warning-500',
    danger: 'color-danger-500',
  },
  primary: {
    main: 'color-primary-500',
    light: 'color-primary-300',
    dark: 'color-primary-700',
  },
} as const

/**
 * Helper function to get a theme color value
 * @param theme - UI Kitten theme object
 * @param tokenPath - Dot notation path to the token (e.g., 'background.primary')
 * @returns Color value
 */
export const getThemeColor = (theme: any, tokenPath: string): string => {
  const keys = tokenPath.split('.')
  let token: any = themeTokens

  for (const key of keys) {
    token = token[key]
  }

  return theme[token] || '#000000'
}

/**
 * Pre-defined color schemes for common use cases
 */
export const colorSchemes = {
  surface: {
    light: {
      background: '#FFFFFF',
      onSurface: '#000000',
      surfaceVariant: '#F8F9FA',
    },
    dark: {
      background: '#121212',
      onSurface: '#FFFFFF',
      surfaceVariant: '#1E1E1E',
    },
  },
  input: {
    light: {
      background: '#F8F9FA',
      border: '#E0E0E0',
      text: '#000000',
      placeholder: '#666666',
    },
    dark: {
      background: '#1E1E1E',
      border: '#404040',
      text: '#FFFFFF',
      placeholder: '#999999',
    },
  },
} as const
