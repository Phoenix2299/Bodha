BODHA v0.7.5 — Unified State + Language Stabilization

Purpose
- One authoritative language state for every visible screen.
- Dashboard/Profile render from the same global state as Diagnostic/Lesson/Practice.
- Canonical skill IDs remain language-neutral.
- Fixes the Learning Journey title/data-binding bug.
- Improves natural Telugu/Hybrid dashboard and profile copy.
- Preserves student/diagnosis/practice data when language changes.

Prototype storage
- localStorage only.
- No production authentication.
- No cloud database.

Recommended test
1. Profile: English -> Telugu -> Hybrid -> English.
2. Dashboard: English -> Telugu -> Hybrid -> English.
3. Navigate Diagnostic -> Analysis -> Learning Map -> Lesson -> Practice.
4. Change language on each screen.
5. Return to Dashboard and verify language follows the selected header language.
6. Verify learning data, diagnosis, target skill and practice state remain unchanged.
