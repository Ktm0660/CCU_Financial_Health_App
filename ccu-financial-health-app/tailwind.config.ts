// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#16324F',
          blue: '#1B4E7A',
          teal: '#2A9CA9',
          sky: '#EAF2F8',
          mist: '#F5F7FA',
          ink: '#0D1B2A',
          card: '#FFFFFF',
          ring: '#C8D6E5',
        },
      },
      boxShadow: {
        card: '0 8px 28px rgba(16,24,40,0.08)',
        focus: '0 0 0 3px rgba(42,156,169,0.35)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
}
export default config
