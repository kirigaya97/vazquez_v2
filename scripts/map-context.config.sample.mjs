/** @context Configuration for the JIT Context Assembly mapper script */

export default {
    // Directories to completely ignore during traversal
    ignore: [
        'node_modules', '.next', '.git', '.husky', '.agent', '.agents',
        'coverage', 'dist', '.vercel', '.gemini', 'scripts',
        // Python: 'venv', '__pycache__', '.mypy_cache'
        // Go: 'vendor'
        // Rust: 'target'
        // Java: '.gradle', 'build'
    ],

    // File extensions considered as "code" for analysis.
    // The mapper has built-in import extractors for: JS/TS, Python, Go, Rust,
    // Java, Kotlin, Ruby, C#, Swift, C/C++, and PHP. Any extension listed here
    // will be scanned; unknown extensions simply get no import data.
    codeExtensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.css', '.sql'],
    // Examples for other stacks:
    // codeExtensions: ['.py', '.pyi'],
    // codeExtensions: ['.go'],
    // codeExtensions: ['.rs', '.toml'],
    // codeExtensions: ['.java', '.kt', '.xml'],

    // Maximum directory depth to scan
    maxDepth: 5,

    // Minimum code files in a directory to generate _CONTEXT.md
    minFilesForContext: 1,

    // Generated file names
    routerFile: 'AI_ROUTER.md',
    contextFile: '_CONTEXT.md',

    // Project metadata (used in AI_ROUTER.md header)
    // TODO: Fill in your project details below
    projectMeta: {
        name: 'TODO: Project Name',
        description: 'TODO: One-line description of what your project does.',
        stack: 'TODO: e.g. Next.js 14 (App Router) · Supabase · Tailwind CSS',
        conventions: [
            'TODO: e.g. Components: PascalCase (MyComponent.js)',
            'TODO: e.g. Libs/utils: camelCase (myUtil.js)',
            'TODO: e.g. Database tables: snake_case (my_table)',
            'TODO: e.g. Server Components by default, "use client" only for interactivity',
        ],
        // Optional: links to key docs. Each entry becomes a line in AI_ROUTER.md
        docs: [
            '- [Architecture](docs/architecture.md) (if exists)',
            '- [Implementation Plan](docs/implementation_plan.md) (if exists)',
        ],
    },

    // Gemini CLI configuration
    gemini: {
        enabled: true,
        // Prompt language: 'es' for Spanish, 'en' for English
        language: 'en',
        // Maximum file size (bytes) to send to Gemini CLI for analysis
        maxFileSizeBytes: 50000,
    },

    // Optional: custom import extractors by extension.
    // These override the built-in extractors. Each must be a function
    // that receives file content (string) and returns an array of import strings.
    // Example:
    // importExtractors: {
    //     '.lua': (content) => {
    //         const imports = [];
    //         const regex = /require\s*\(\s*['"](.+?)['"]\s*\)/g;
    //         let match;
    //         while ((match = regex.exec(content)) !== null) {
    //             imports.push(match[1]);
    //         }
    //         return imports;
    //     },
    // },
}
