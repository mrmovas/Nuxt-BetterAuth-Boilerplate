import type { Config } from 'tailwindcss'


export default {
    content: [
        './app/**/*.{vue,js,ts}',
        './components/**/*.{vue,js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                border: 'var(--color-border)',
                accent: 'var(--color-accent)',
                muted: 'var(--color-muted)',
                danger: 'var(--color-danger)',
                ok: 'var(--color-ok)',
            },
            fontFamily: {
                serif: ['"DM Serif Display"', 'Georgia', 'serif'],
                mono: ['"DM Mono"', 'monospace'],
            },
        },
    },
    plugins: [],
} satisfies Config
