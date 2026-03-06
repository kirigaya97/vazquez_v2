/** @context Configuration for the JIT Context Assembly mapper script — Vazquez Ilusionista */

export default {
    // Directories to completely ignore during traversal
    ignore: [
        'node_modules', '.next', '.git', '.husky', '.agent', '.agents',
        'coverage', 'dist', '.vercel', '.astro', '.gemini', 'scripts', 'public',
    ],

    // File extensions considered as "code" for analysis.
    codeExtensions: ['.astro', '.ts', '.tsx', '.js', '.mjs', '.css', '.json'],

    // Maximum directory depth to scan
    maxDepth: 5,

    // Minimum code files in a directory to generate _CONTEXT.md
    minFilesForContext: 1,

    // Generated file names
    routerFile: 'AI_ROUTER.md',
    contextFile: '_CONTEXT.md',

    // Project metadata
    projectMeta: {
        name: 'Vazquez Ilusionista',
        description: 'Premium landing page for Fernando Vazquez, world-class magician/mentalist (Argentina). Static-first, Spanish-only.',
        stack: 'Astro v5 · Tailwind CSS 4 · GSAP v3 · Motion · Lenis · React Islands · Vercel',
        conventions: [
            'Sections: PascalCase .astro in src/components/sections/',
            'UI atoms: PascalCase .astro or .tsx in src/components/ui/',
            'ALL user-facing text comes from src/data/site-config.json (never hardcode)',
            'Zero client JS by default — use client:visible for below-fold islands',
            'Imports: always astro/zod, never zod. ClientRouter not ViewTransitions.',
        ],
        docs: [
            '- [Master Prompt](.agent/master-prompt.md) — project blueprint and rules',
            '- [Skills](.agent/skills/) — verified API patterns (Astro, GSAP, Motion, Tailwind)',
        ],
    },

    // Gemini CLI configuration
    gemini: {
        enabled: true,
        // Prompt language: 'es' for Spanish, 'en' for English
        language: 'es',
        // Maximum file size (bytes) to send to Gemini CLI for analysis
        maxFileSizeBytes: 50000,
    },
}
