@AGENTS.md

# Coding Principles

Apply to every change. When two conflict, prefer clarity over cleverness.

## KISS — Keep It Simple
Simplest solution that fully solves the problem. No speculative abstraction layers, no clever one-liners that need a comment to decode. Flat over nested; early return over deep `if` trees. If a reviewer needs a walkthrough to follow it, simplify it.

## DRY — Don't Repeat Yourself
One source of truth for each piece of knowledge. Extract shared logic, constants, types, and Tailwind class sets into a single named export. But: two things that *look* alike but change for different reasons are not duplication — do not couple them. Wait for the third occurrence before abstracting.

## Self-Documenting Code
Names carry the meaning; comments explain *why*, never *what*.
- Intent-revealing names: `isSubmitting`, `activeStudentCount` — not `flag`, `tmp`, `data2`.
- No magic values — name them (`const MAX_UPLOAD_MB = 10`).
- Small functions doing one thing, named after that thing.
- Types are documentation — model the domain, avoid `any`.
- Delete commented-out code; git has it.

## YAGNI — You Aren't Gonna Need It
Build only what is asked for now. No config flags, hooks, or generic parameters for hypothetical future cases. No dependency added for one small utility. Delete dead code and unused exports on sight.
