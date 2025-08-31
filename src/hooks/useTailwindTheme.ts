import { useTheme as useUIKittenTheme } from '@ui-kitten/components'
import { useTheme } from './useTheme'
import {
  getTailwindColor,
  getTailwindSemanticColors,
  tailwindColors,
} from '../themes/tailwindFirstTheme'

/**
 * Tailwind-First Theme Hook
 * Provides easy access to theme colors with Tailwind as the single source of truth
 */
export const useTailwindTheme = () => {
  const { isDarkMode } = useTheme()
  const uiKittenTheme = useUIKittenTheme()

  // Get semantic colors based on Tailwind palette
  const semanticColors = getTailwindSemanticColors(isDarkMode)

  // Direct access to UI Kitten theme colors (now populated from Tailwind)
  const colors = {
    // Background colors (from Tailwind-generated UI Kitten theme)
    background: {
      primary: uiKittenTheme['background-basic-color-1'],
      secondary: uiKittenTheme['background-basic-color-2'],
      tertiary: uiKittenTheme['background-basic-color-3'],
      elevated: uiKittenTheme['background-basic-color-4'],
    },

    // Text colors (from Tailwind-generated UI Kitten theme)
    text: {
      primary: uiKittenTheme['text-basic-color'],
      secondary: uiKittenTheme['text-hint-color'],
      disabled: uiKittenTheme['text-disabled-color'],
      control: uiKittenTheme['text-control-color'],
      alternate: uiKittenTheme['text-alternate-color'],
    },

    // Border colors (from Tailwind-generated UI Kitten theme)
    border: {
      subtle: uiKittenTheme['border-basic-color-1'],
      default: uiKittenTheme['border-basic-color-2'],
      prominent: uiKittenTheme['border-basic-color-3'],
      active: uiKittenTheme['border-basic-color-4'],
      focus: uiKittenTheme['border-basic-color-5'],
    },

    // Brand colors (directly from Tailwind)
    brand: semanticColors.brand,

    // Status colors (directly from Tailwind)
    status: semanticColors.status,

    // Primary color variations (from Tailwind-generated UI Kitten theme)
    primary: {
      100: uiKittenTheme['color-primary-100'],
      200: uiKittenTheme['color-primary-200'],
      300: uiKittenTheme['color-primary-300'],
      400: uiKittenTheme['color-primary-400'],
      500: uiKittenTheme['color-primary-500'],
      600: uiKittenTheme['color-primary-600'],
      700: uiKittenTheme['color-primary-700'],
      800: uiKittenTheme['color-primary-800'],
      900: uiKittenTheme['color-primary-900'],
    },

    // Basic grayscale (from Tailwind-generated UI Kitten theme)
    basic: {
      100: uiKittenTheme['color-basic-100'],
      200: uiKittenTheme['color-basic-200'],
      300: uiKittenTheme['color-basic-300'],
      400: uiKittenTheme['color-basic-400'],
      500: uiKittenTheme['color-basic-500'],
      600: uiKittenTheme['color-basic-600'],
      700: uiKittenTheme['color-basic-700'],
      800: uiKittenTheme['color-basic-800'],
      900: uiKittenTheme['color-basic-900'],
    },
  }

  // Pre-defined color combinations for common UI patterns
  const combinations = {
    // Card/surface styling
    card: {
      background: colors.background.secondary,
      text: colors.text.primary,
      border: colors.border.subtle,
    },

    // Input/form styling
    input: {
      background: semanticColors.background.secondary,
      text: semanticColors.text.primary,
      placeholder: semanticColors.text.secondary,
      border: semanticColors.border.default,
      borderFocus: colors.primary[500],
    },

    // Button styling
    button: {
      primary: {
        background: colors.primary[500],
        text: colors.text.alternate,
      },
      secondary: {
        background: colors.background.tertiary,
        text: colors.text.primary,
      },
      ghost: {
        background: 'transparent',
        text: colors.primary[500],
      },
      success: {
        background: colors.status.success,
        text: colors.text.alternate,
      },
      warning: {
        background: colors.status.warning,
        text: colors.text.alternate,
      },
      danger: {
        background: colors.status.danger,
        text: colors.text.alternate,
      },
    },

    // Navigation/drawer styling
    navigation: {
      background: colors.background.primary,
      text: colors.text.primary,
      active: colors.primary[500],
      border: colors.border.subtle,
    },
  }

  // Tailwind-specific utilities
  const tailwind = {
    // Get any Tailwind color by name
    getColor: (colorName: string) => getTailwindColor(colorName),

    // All available Tailwind colors
    colors: tailwindColors,

    // CSS class helpers (for when using Tailwind classes)
    classes: {
      // Background classes based on theme
      bgPrimary: isDarkMode ? 'bg-gray-900' : 'bg-color-basic-100',
      bgSecondary: isDarkMode ? 'bg-gray-800' : 'bg-color-basic-200',

      // Text classes based on theme
      textPrimary: isDarkMode ? 'text-white' : 'text-text-basic-color',
      textSecondary: isDarkMode ? 'text-gray-400' : 'text-color-basic-700',

      // Border classes based on theme
      borderDefault: isDarkMode ? 'border-gray-700' : 'border-color-basic-400',
    },
  }

  // Helper function to get any UI Kitten color token
  const getUIKittenColor = (tokenName: string): string => {
    return uiKittenTheme[tokenName] || '#000000'
  }

  return {
    colors,
    combinations,
    semanticColors,
    tailwind,
    getUIKittenColor,
    isDarkMode,
    theme: uiKittenTheme,
  }
}

// Export for backwards compatibility (alias to the new hook)
export const useThemeColors = useTailwindTheme
