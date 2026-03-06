---
description: How to navigate the codebase using JIT Context Assembly
---

# JIT Context Navigation

Before making any code changes, follow these steps:

// turbo-all
1. Read `AI_ROUTER.md` at the project root to understand the overall structure
2. Identify which directory(ies) are relevant to the current task
3. Read the `_CONTEXT.md` of those directories to understand contents without reading every file
4. Read ONLY the specific files you need to modify or reference
5. Execute the task with minimal, precise context

## Rules
- **DO NOT index the entire workspace** — navigate hop-by-hop
- **Always start from AI_ROUTER.md** — it's your map
- **Each `_CONTEXT.md` explains its directory** — use it to decide which files to read
- **If you create new files**, the mapper will document them on the next commit
