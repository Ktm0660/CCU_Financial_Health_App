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
          navy: '#0A2A4A',
          blue: '#1E4976',
          gold: '#C9A227',
          sky: '#E9F2FA',
          sand: '#F6F2E7',
          ink: '#1B1F23',
          stone: 'rgba(27,31,35,0.6)',
          card: '#FFFFFF',
        },
      },
      boxShadow: {
        card: '0 4px 18px rgba(10, 42, 74, 0.08)',
        focus: '0 0 0 3px rgba(201,162,39,0.35)',
      },
      borderRadius: {
        xl: '14px',
      },
    },
  },
  plugins: [],
}
export default config
