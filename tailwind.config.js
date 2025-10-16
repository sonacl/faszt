import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index-new.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indickator': 'var(--color-indickator)',
      }
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "oklch(0.71 0.14 194.06)",
          "secondary": "oklch(0.64 0.23 353.85)",
          "accent": "oklch(77% 0.152 181.912)",
          "neutral": "oklch(14% 0.005 285.823)",
          "base-100": "oklch(100% 0 0)",
          "base-200": "oklch(98% 0 0)",
          "base-300": "oklch(95% 0 0)",
          "base-content": "oklch(21% 0.006 285.885)",
          "info": "oklch(74% 0.16 232.661)",
          "success": "oklch(76% 0.177 163.223)",
          "warning": "oklch(82% 0.189 84.429)",
          "error": "oklch(71% 0.194 13.428)",
        },
        dark: {
          "primary": "oklch(0.88 0.17 194.23)",
          "secondary": "oklch(0.7 0.29 334.78)",
          "accent": "oklch(77% 0.152 181.912)",
          "neutral": "oklch(14% 0.005 285.823)",
          "base-100": "oklch(25.33% 0.016 252.42)",
          "base-200": "oklch(23.26% 0.014 253.1)",
          "base-300": "oklch(21.15% 0.012 254.09)",
          "base-content": "oklch(97.807% 0.029 256.847)",
          "info": "oklch(74% 0.16 232.661)",
          "success": "oklch(76% 0.177 163.223)",
          "warning": "oklch(82% 0.189 84.429)",
          "error": "oklch(71% 0.194 13.428)",
        }
      }
    ]
  }
}
