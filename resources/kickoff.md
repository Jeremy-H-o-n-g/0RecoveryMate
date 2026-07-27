Work from the RecoverMate repository root.

Read these files first:
- README.md
- TASKS.md
- prompts/GlobalEngineeringContract.md
- the current session prompt referenced by TASKS.md

Execute only the current session.

Before editing:
1. inspect the existing project state;
2. summarize what already works and the known issues;
3. run the available baseline checks;
4. create a Git checkpoint.

During the session:
- follow the current session prompt exactly;
- preserve working and unrelated files;
- do not implement future sessions;
- do not fabricate manual work, reviews, evidence, or test results.

At completion:
1. run the required tests and manual checks;
2. compare the results with every acceptance criterion;
3. report changed files and exact test results;
4. update TASKS.md in place;
5. activate the next session only if the current session passes;
6. stop without implementing the next session.