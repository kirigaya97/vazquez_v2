#!/usr/bin/env node
/** @context JIT Context Assembly mapper. Generates _CONTEXT.md per directory and AI_ROUTER.md at root. */

import { readdir, stat, readFile, writeFile, access } from 'node:fs/promises';
import { writeFileSync, unlinkSync } from 'node:fs';
import { join, relative, extname, basename, dirname } from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import config from './map-context.config.mjs';

const ROOT = process.cwd();
const isFullMode = process.argv.includes('--full');
const isDryRun = process.argv.includes('--dry-run');
const isQuiet = process.argv.includes('--quiet');

// ─── Usage Metrics ──────────────────────────────────────────────────
const metrics = { dirs: [], geminiCalls: 0, deterministicCalls: 0, totalPromptChars: 0, totalResponseChars: 0 };

// ─── Utilities ──────────────────────────────────────────────────────

function log(...args) {
    if (!isQuiet) console.log('📍', ...args);
}

function warn(...args) {
    console.warn('⚠️', ...args);
}

async function fileExists(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

// ─── Phase 1: Structural Analysis ───────────────────────────────────

/**
 * Get list of changed directories from git staging area.
 * In --full mode, returns all directories.
 */
function getChangedDirectories() {
    if (isFullMode) return null; // null = all directories

    try {
        const output = execSync('git diff --cached --name-only', { encoding: 'utf-8' });
        const files = output.trim().split('\n').filter(Boolean);
        const dirs = new Set();
        for (const file of files) {
            const dir = dirname(file);
            if (dir !== '.') {
                dirs.add(dir);
                // Also add parent directories
                let parent = dirname(dir);
                while (parent !== '.') {
                    dirs.add(parent);
                    parent = dirname(parent);
                }
            }
        }
        return dirs;
    } catch {
        return null; // If git fails, process all
    }
}

/**
 * Recursively scan a directory and build a structural skeleton.
 */
async function scanDirectory(dirPath, depth = 0) {
    if (depth > config.maxDepth) return null;

    const dirName = basename(dirPath);
    if (config.ignore.includes(dirName)) return null;

    let entries;
    try {
        entries = await readdir(dirPath, { withFileTypes: true });
    } catch {
        return null;
    }

    const files = [];
    const subdirs = [];

    for (const entry of entries) {
        if (entry.name.startsWith('.') && entry.name !== '.env.example') continue;
        if (entry.name === config.contextFile) continue;

        const fullPath = join(dirPath, entry.name);

        if (entry.isDirectory()) {
            if (!config.ignore.includes(entry.name)) {
                const subResult = await scanDirectory(fullPath, depth + 1);
                if (subResult) subdirs.push(subResult);
            }
        } else if (entry.isFile()) {
            const ext = extname(entry.name);
            if (config.codeExtensions.includes(ext)) {
                const fileStat = await stat(fullPath);
                const content = fileStat.size <= config.gemini.maxFileSizeBytes
                    ? await readFile(fullPath, 'utf-8')
                    : null;

                files.push({
                    name: entry.name,
                    ext,
                    size: fileStat.size,
                    sizeHuman: formatBytes(fileStat.size),
                    content,
                    imports: content ? extractImports(content, ext) : [],
                });
            }
        }
    }

    if (files.length < config.minFilesForContext && subdirs.length === 0) {
        return null;
    }

    return {
        path: relative(ROOT, dirPath).replace(/\\/g, '/'),
        absolutePath: dirPath,
        name: dirName,
        files,
        subdirs,
        depth,
    };
}

// ─── Language-Specific Import Extractors ────────────────────────────

/**
 * Built-in import extractors by file extension.
 * Each extractor receives file content and returns an array of import strings.
 */
const BUILTIN_IMPORT_EXTRACTORS = {
    // JavaScript / TypeScript (ES modules + CommonJS)
    '.js': extractJsImports,
    '.jsx': extractJsImports,
    '.ts': extractJsImports,
    '.tsx': extractJsImports,
    '.mjs': extractJsImports,
    '.cjs': extractJsImports,

    // Python
    '.py': extractPythonImports,

    // Go
    '.go': extractGoImports,

    // Rust
    '.rs': extractRustImports,

    // Java / Kotlin
    '.java': extractJavaImports,
    '.kt': extractJavaImports,

    // Ruby
    '.rb': extractRubyImports,

    // C#
    '.cs': extractCsharpImports,

    // Swift
    '.swift': extractSwiftImports,

    // C / C++
    '.c': extractCppImports,
    '.cpp': extractCppImports,
    '.h': extractCppImports,
    '.hpp': extractCppImports,

    // PHP
    '.php': extractPhpImports,
};

/**
 * Extract imports from a file using the appropriate language extractor.
 * Falls back to empty array for unsupported extensions.
 */
function extractImports(content, ext) {
    // User-defined extractors take priority over built-ins
    const userExtractors = config.importExtractors || {};
    const extractor = userExtractors[ext] || BUILTIN_IMPORT_EXTRACTORS[ext];
    if (!extractor) return [];
    try {
        return extractor(content);
    } catch {
        return [];
    }
}

function extractJsImports(content) {
    const imports = [];
    let match;
    // ES modules: import ... from '...'
    const esRegex = /import\s+(?:.*?)\s+from\s+['"](.+?)['"]/g;
    while ((match = esRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    // CommonJS: require('...')
    const cjsRegex = /require\s*\(\s*['"](.+?)['"]\s*\)/g;
    while ((match = cjsRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function extractPythonImports(content) {
    const imports = [];
    let match;
    // from X import Y  /  import X
    const fromRegex = /^from\s+([\w.]+)\s+import/gm;
    while ((match = fromRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    const importRegex = /^import\s+([\w.]+(?:\s*,\s*[\w.]+)*)/gm;
    while ((match = importRegex.exec(content)) !== null) {
        for (const mod of match[1].split(',')) {
            imports.push(mod.trim());
        }
    }
    return imports;
}

function extractGoImports(content) {
    const imports = [];
    let match;
    // Single: import "pkg"
    const singleRegex = /import\s+"([^"]+)"/g;
    while ((match = singleRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    // Block: import ( ... )
    const blockRegex = /import\s*\(([^)]*)\)/g;
    while ((match = blockRegex.exec(content)) !== null) {
        const block = match[1];
        const lineRegex = /"([^"]+)"/g;
        let lineMatch;
        while ((lineMatch = lineRegex.exec(block)) !== null) {
            imports.push(lineMatch[1]);
        }
    }
    return imports;
}

function extractRustImports(content) {
    const imports = [];
    let match;
    // use crate::foo, use std::bar, use super::baz
    const useRegex = /^use\s+([\w:]+(?:::\{[^}]+\})?)/gm;
    while ((match = useRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    // extern crate foo
    const externRegex = /^extern\s+crate\s+(\w+)/gm;
    while ((match = externRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function extractJavaImports(content) {
    const imports = [];
    let match;
    // import com.foo.Bar  /  import static com.foo.Bar.method
    const regex = /^import\s+(?:static\s+)?([\w.]+)/gm;
    while ((match = regex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function extractRubyImports(content) {
    const imports = [];
    let match;
    // require 'foo'  /  require "foo"  /  require_relative 'foo'
    const regex = /(?:require_relative|require)\s+['"](.+?)['"]/g;
    while ((match = regex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function extractCsharpImports(content) {
    const imports = [];
    let match;
    // using System.Linq;
    const regex = /^using\s+([\w.]+)\s*;/gm;
    while ((match = regex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function extractSwiftImports(content) {
    const imports = [];
    let match;
    // import Foundation  /  import UIKit
    const regex = /^import\s+(\w+)/gm;
    while ((match = regex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function extractCppImports(content) {
    const imports = [];
    let match;
    // #include <header>  /  #include "header"
    const regex = /^#include\s+[<"]([^>"]+)[>"]/gm;
    while ((match = regex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function extractPhpImports(content) {
    const imports = [];
    let match;
    // use App\Models\User;  /  require_once 'file.php';
    const useRegex = /^use\s+([\w\\]+)/gm;
    while ((match = useRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    const reqRegex = /(?:require_once|require|include_once|include)\s+['"](.+?)['"]/g;
    while ((match = reqRegex.exec(content)) !== null) {
        imports.push(match[1]);
    }
    return imports;
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Phase 2: Gemini CLI Integration ────────────────────────────────

/**
 * Check if Gemini CLI is available.
 */
function isGeminiAvailable() {
    if (!config.gemini.enabled) return false;
    try {
        execSync('gemini --version', { encoding: 'utf-8', stdio: 'pipe' });
        return true;
    } catch {
        return false;
    }
}

/**
 * Generate _CONTEXT.md content using Gemini CLI (cross-platform).
 * Uses spawnSync to pipe the prompt via stdin — works on Windows, macOS, Linux.
 */
async function generateWithGeminiCLI(dirInfo, existingManualSections) {
    const prompt = buildGeminiPrompt(dirInfo, existingManualSections);
    const callStart = Date.now();

    try {
        const result = spawnSync('gemini', [], {
            input: prompt,
            encoding: 'utf-8',
            timeout: 60000,
            maxBuffer: 1024 * 1024,
            stdio: ['pipe', 'pipe', 'ignore'],
            shell: process.platform === 'win32',
        });

        if (result.error) throw result.error;
        if (result.status !== 0) throw new Error(`Gemini CLI exited with code ${result.status}`);

        const responseText = (result.stdout || '').trim();
        if (!responseText) throw new Error('Empty response from Gemini CLI');

        const elapsed = Date.now() - callStart;

        // Track metrics
        metrics.geminiCalls++;
        metrics.totalPromptChars += prompt.length;
        metrics.totalResponseChars += responseText.length;
        metrics.dirs.push({
            path: dirInfo.path,
            mode: 'gemini',
            promptChars: prompt.length,
            responseChars: responseText.length,
            elapsedMs: elapsed,
        });

        return responseText;
    } catch (e) {
        warn(`Gemini CLI falló para ${dirInfo.path}: ${e.message}`);
        return null;
    }
}

/**
 * Build the prompt for Gemini CLI to generate a _CONTEXT.md.
 */
function buildGeminiPrompt(dirInfo, manualSections) {
    const lang = config.gemini.language || 'en';
    const isEs = lang === 'es';

    let prompt = isEs
        ? `Sos un documentador técnico. Generá un archivo _CONTEXT.md para el directorio \`${dirInfo.path}/\` de un proyecto ${config.projectMeta.stack}.\n\n## Archivos en el directorio\n`
        : `You are a technical documenter. Generate a _CONTEXT.md file for the directory \`${dirInfo.path}/\` of a ${config.projectMeta.stack} project.\n\n## Files in the directory\n`;

    for (const file of dirInfo.files) {
        prompt += `\n### ${file.name} (${file.sizeHuman})`;
        if (file.imports.length > 0) {
            prompt += `\nImports: ${file.imports.join(', ')}`;
        }
        if (file.content) {
            prompt += `\n\`\`\`${file.ext.replace('.', '')}\n${file.content}\n\`\`\`\n`;
        } else {
            prompt += isEs
                ? `\n(archivo demasiado grande para incluir)\n`
                : `\n(file too large to include)\n`;
        }
    }

    if (dirInfo.subdirs.length > 0) {
        prompt += isEs ? `\n## Subdirectorios\n` : `\n## Subdirectories\n`;
        for (const sub of dirInfo.subdirs) {
            prompt += `- \`${sub.name}/\` — ${sub.files.length} ${isEs ? 'archivos' : 'files'}\n`;
        }
    }

    if (manualSections) {
        prompt += isEs
            ? `\n## Secciones manuales a preservar (incluir textualmente)\n${manualSections}\n`
            : `\n## Manual sections to preserve (include verbatim)\n${manualSections}\n`;
    }

    const instructions = isEs
        ? `

## Instrucciones
Generá SOLO el contenido markdown con este formato exacto:

# 📁 ${dirInfo.path}

## Propósito
[1-2 oraciones explicando qué hace este módulo/directorio]

## Archivos
| Archivo | Descripción |
|---|---|
[una fila por archivo con descripción funcional breve]

## Relaciones
- **Usa**: [módulos externos que consume, basado en imports]
- **Usado por**: [inferir si es posible, o poner "Por determinar"]

## Detalles clave
[Bullets con lógica de negocio importante, patrones, o consideraciones]

Reglas:
- No incluyas bloques de código en el output
- No inventes archivos que no existen
- Escribí en español
- Sé conciso pero informativo
- Si hay secciones manuales, incluílas al final exactamente como están`
        : `

## Instructions
Generate ONLY the markdown content in this exact format:

# 📁 ${dirInfo.path}

## Purpose
[1-2 sentences explaining what this module/directory does]

## Files
| File | Description |
|---|---|
[one row per file with a brief functional description]

## Relations
- **Uses**: [external modules it consumes, based on imports]
- **Used by**: [infer if possible, or put "TBD"]

## Key Details
[Bullets with important business logic, patterns, or considerations]

Rules:
- Do NOT include code blocks in the output
- Do NOT invent files that don't exist
- Write in English
- Be concise but informative
- If there are manual sections, include them at the end exactly as they are`;

    prompt += instructions;
    return prompt;
}

// ─── Deterministic Fallback ─────────────────────────────────────────

/**
 * Generate _CONTEXT.md content deterministically (no LLM).
 */
function generateDeterministic(dirInfo, manualSections) {
    let content = `# 📁 ${dirInfo.path}\n\n`;
    content += `> Auto-generated by \`scripts/map-context.mjs\` (deterministic mode)\n\n`;
    content += `## Files\n`;
    content += `| File | Size | Imports |\n`;
    content += `|---|---|---|\n`;

    for (const file of dirInfo.files) {
        const imports = file.imports.length > 0
            ? file.imports.slice(0, 3).join(', ') + (file.imports.length > 3 ? '...' : '')
            : '—';
        content += `| \`${file.name}\` | ${file.sizeHuman} | ${imports} |\n`;
    }

    if (dirInfo.subdirs.length > 0) {
        content += `\n## Subdirectories\n`;
        for (const sub of dirInfo.subdirs) {
            content += `- [\`${sub.name}/\`](${sub.name}/_CONTEXT.md) — ${sub.files.length} files\n`;
        }
    }

    if (manualSections) {
        content += `\n${manualSections}\n`;
    }

    return content;
}

// ─── Manual Section Preservation ────────────────────────────────────

/**
 * Extract MANUAL sections from existing _CONTEXT.md.
 */
async function extractManualSections(contextFilePath) {
    if (!(await fileExists(contextFilePath))) return null;

    const content = await readFile(contextFilePath, 'utf-8');
    const regex = /<!-- MANUAL:START -->([\s\S]*?)<!-- MANUAL:END -->/g;
    const sections = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        sections.push(`<!-- MANUAL:START -->${match[1]}<!-- MANUAL:END -->`);
    }

    return sections.length > 0 ? sections.join('\n\n') : null;
}

// ─── AI_ROUTER.md Generation ────────────────────────────────────────

/**
 * Generate the root AI_ROUTER.md by aggregating all _CONTEXT.md files.
 */
async function generateRouter(rootDir) {
    const { projectMeta } = config;

    let content = `# 🧭 AI Router — ${projectMeta.name}

> Entry point for AI agents. Read this file first.  
> Auto-generated by \`scripts/map-context.mjs\`  
> Last updated: ${new Date().toISOString().split('T')[0]}

## Project
${projectMeta.description}

## Stack
${projectMeta.stack}

## Conventions
${projectMeta.conventions.map(c => `- ${c}`).join('\n')}

## Project Map
| Directory | Files | Context |
|---|---|---|
`;

    // Collect all directories with _CONTEXT.md
    const contextFiles = await findContextFiles(ROOT);
    for (const cf of contextFiles) {
        const relDir = dirname(relative(ROOT, cf)).replace(/\\/g, '/');
        const fileCount = await countCodeFiles(dirname(cf));
        content += `| \`${relDir}/\` | ${fileCount} | [→ _CONTEXT.md](${relDir}/_CONTEXT.md) |\n`;
    }

    content += `\n\n## Documentation
${(projectMeta.docs || ['- See \`docs/\` directory']).join('\n')}

## How to Navigate (for agents)
1. Read this file to understand the project
2. Identify which directory(ies) are relevant to your task
3. Read the \`_CONTEXT.md\` of those directories  
4. Read ONLY the specific files you need
5. Execute the task with minimal, precise context
`;

    return content;
}

/**
 * Recursively find all _CONTEXT.md files.
 */
async function findContextFiles(dirPath, depth = 0) {
    if (depth > config.maxDepth) return [];

    const dirName = basename(dirPath);
    if (depth > 0 && config.ignore.includes(dirName)) return [];

    const results = [];
    let entries;
    try {
        entries = await readdir(dirPath, { withFileTypes: true });
    } catch {
        return [];
    }

    for (const entry of entries) {
        if (entry.name === config.contextFile && entry.isFile()) {
            results.push(join(dirPath, entry.name));
        }
        if (entry.isDirectory() && !config.ignore.includes(entry.name) && !entry.name.startsWith('.')) {
            const sub = await findContextFiles(join(dirPath, entry.name), depth + 1);
            results.push(...sub);
        }
    }

    return results;
}

/**
 * Count code files in a directory.
 */
async function countCodeFiles(dirPath) {
    try {
        const entries = await readdir(dirPath, { withFileTypes: true });
        return entries.filter(e =>
            e.isFile() && config.codeExtensions.includes(extname(e.name))
        ).length;
    } catch {
        return 0;
    }
}

// ─── Main Execution ─────────────────────────────────────────────────

async function main() {
    log('🗺️  JIT Context Assembly — Mapper');
    log(`Mode: ${isFullMode ? 'FULL' : 'INCREMENTAL'}`);

    const startTime = Date.now();

    // Phase 1: Scan directory structure
    log('Phase 1: Structural analysis...');
    const changedDirs = getChangedDirectories();
    const tree = await scanDirectory(ROOT);

    if (!tree) {
        log('No code files found.');
        return;
    }

    // Collect all directories to process
    const dirsToProcess = collectDirectories(tree);
    const filteredDirs = changedDirs
        ? dirsToProcess.filter(d => changedDirs.has(d.path) || isFullMode)
        : dirsToProcess;

    log(`Directories to process: ${filteredDirs.length}`);

    // Check Gemini CLI availability
    const useGemini = isGeminiAvailable();
    if (useGemini) {
        log('Phase 2: Gemini CLI available — generating intelligent context');
    } else {
        warn('Gemini CLI not available — using deterministic fallback');
    }

    // Process each directory
    let processed = 0;
    for (const dir of filteredDirs) {
        const contextPath = join(dir.absolutePath, config.contextFile);
        const manualSections = await extractManualSections(contextPath);

        let content;
        if (useGemini && !isDryRun) {
            content = await generateWithGeminiCLI(dir, manualSections);
        }

        // Fallback to deterministic if Gemini failed or is not available
        if (!content) {
            content = generateDeterministic(dir, manualSections);
            metrics.deterministicCalls++;
            metrics.dirs.push({ path: dir.path, mode: 'deterministic', promptChars: 0, responseChars: content.length, elapsedMs: 0 });
        }

        if (!isDryRun) {
            await writeFile(contextPath, content, 'utf-8');
        }

        processed++;
        log(`  ✅ ${dir.path}/_CONTEXT.md`);
    }

    // Generate AI_ROUTER.md
    log('Generating AI_ROUTER.md...');
    const routerContent = await generateRouter(ROOT);
    if (!isDryRun) {
        await writeFile(join(ROOT, config.routerFile), routerContent, 'utf-8');
    }
    log('  ✅ AI_ROUTER.md');

    const elapsed = Date.now() - startTime;
    log(`\n✨ Done: ${processed} directories processed in ${elapsed}ms`);

    // ─── Usage Report ────────────────────────────────────────────
    if (metrics.dirs.length > 0) {
        log('\n📊 Gemini CLI Usage Report');
        log('─'.repeat(90));
        log(`${'Directory'.padEnd(45)} ${'Mode'.padEnd(14)} ${'Prompt'.padStart(8)} ${'Response'.padStart(10)} ${'Time'.padStart(8)}`);
        log('─'.repeat(90));
        for (const d of metrics.dirs) {
            const mode = d.mode === 'gemini' ? '🤖 gemini' : '📐 determ.';
            const prompt = d.mode === 'gemini' ? `${(d.promptChars / 1000).toFixed(1)}k` : '—';
            const response = `${(d.responseChars / 1000).toFixed(1)}k`;
            const time = d.mode === 'gemini' ? `${(d.elapsedMs / 1000).toFixed(1)}s` : '—';
            log(`  ${d.path.padEnd(43)} ${mode.padEnd(14)} ${prompt.padStart(8)} ${response.padStart(10)} ${time.padStart(8)}`);
        }
        log('─'.repeat(90));
        log(`  Gemini calls: ${metrics.geminiCalls} | Deterministic: ${metrics.deterministicCalls}`);
        log(`  Total prompt: ${(metrics.totalPromptChars / 1000).toFixed(1)}k chars (~${Math.ceil(metrics.totalPromptChars / 4)} tokens est.)`);
        log(`  Total response: ${(metrics.totalResponseChars / 1000).toFixed(1)}k chars (~${Math.ceil(metrics.totalResponseChars / 4)} tokens est.)`);
        log(`  Total time: ${(elapsed / 1000).toFixed(1)}s`);
    }
}

/**
 * Flatten directory tree into array.
 */
function collectDirectories(node) {
    const result = [];
    if (node.files.length >= config.minFilesForContext) {
        result.push(node);
    }
    for (const sub of node.subdirs) {
        result.push(...collectDirectories(sub));
    }
    return result;
}

main().catch(e => {
    console.error('❌ Mapper error:', e.message);
    process.exit(1);
});
