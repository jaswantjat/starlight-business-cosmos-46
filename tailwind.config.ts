
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['"Space Grotesk"', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cosmic: {
					'bg-dark': '#050508',
					'bg-dark-alt': '#0A0A12',
					'bg-light': '#12121A',
					'neon-green': '#00FF99', // Brighter green matching inspiration
					'neon-blue': '#7A88FB',
					'neon-purple': '#B467FB',
					'neon-teal': '#24CDD8',
					'dark-blue': '#1A1E39',
					'grid-line': 'rgba(0, 255, 153, 0.2)',
					'panel-bg': 'rgba(10, 10, 16, 0.8)',
					'panel-border': 'rgba(0, 255, 153, 0.3)',
					'panel-glow': 'rgba(0, 255, 153, 0.5)',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '0.8', boxShadow: '0 0 5px rgba(0, 255, 153, 0.7)' },
					'50%': { opacity: '1', boxShadow: '0 0 15px rgba(0, 255, 153, 0.9)' },
				},
				'pulse-glow-blue': {
					'0%, 100%': { opacity: '0.8', boxShadow: '0 0 5px rgba(122, 136, 251, 0.7)' },
					'50%': { opacity: '1', boxShadow: '0 0 15px rgba(122, 136, 251, 0.9)' },
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'scale-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'rotate-appearing': {
					'0%': { transform: 'rotate(180deg) scale(0)', opacity: '0' },
					'100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
				},
				'grid-fade': {
					'0%': { opacity: '0.1' },
					'50%': { opacity: '0.3' },
					'100%': { opacity: '0.1' },
				},
				'scan-line': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' },
				},
				'circuit-flow': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '200% 0%' },
				},
				'node-pulse': {
					'0%': { transform: 'scale(1)', opacity: '0.7' },
					'50%': { transform: 'scale(1.2)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '0.7' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float 5s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'pulse-glow-blue': 'pulse-glow-blue 2.5s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 15s linear infinite',
				'scale-pulse': 'scale-pulse 3s ease-in-out infinite',
				'shimmer': 'shimmer 6s infinite linear',
				'rotate-appearing': 'rotate-appearing 0.6s ease-out forwards',
				'grid-fade': 'grid-fade 4s ease-in-out infinite',
				'scan-line': 'scan-line 3s ease-in-out infinite',
				'circuit-flow': 'circuit-flow 8s linear infinite',
				'node-pulse': 'node-pulse 3s ease-in-out infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,255,153,0.05) 25%, rgba(0,255,153,0.1) 50%, rgba(0,255,153,0.05) 75%, rgba(255,255,255,0) 100%)',
				'circuit-pattern': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10 L90 10 L90 90 L10 90 Z\' fill=\'none\' stroke=\'%2300FF9922\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M30 10 L30 90\' stroke=\'%2300FF9911\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M50 10 L50 90\' stroke=\'%2300FF9911\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M70 10 L70 90\' stroke=\'%2300FF9911\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M10 30 L90 30\' stroke=\'%2300FF9911\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M10 50 L90 50\' stroke=\'%2300FF9911\' stroke-width=\'0.5\'/%3E%3Cpath d=\'M10 70 L90 70\' stroke=\'%2300FF9911\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
				'tech-grid': 'linear-gradient(to right, rgba(0, 255, 153, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 153, 0.1) 1px, transparent 1px)',
				'glow-radial': 'radial-gradient(circle at center, rgba(0, 255, 153, 0.2) 0%, rgba(0, 255, 153, 0.1) 25%, transparent 60%)',
				'circuit-flow': 'linear-gradient(90deg, rgba(0, 255, 153, 0) 0%, rgba(0, 255, 153, 0.3) 50%, rgba(0, 255, 153, 0) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
