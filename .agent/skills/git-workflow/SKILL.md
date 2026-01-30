---
name: Git Workflow
description: Enforces a strict git branch and review workflow for all changes.
---

# Git Workflow Skill

You are responsible for ensuring all code changes follow a strict Git workflow to keep the main branch stable.

## Responsibilities

1.  **Branch Management**:
    -   NEVER commit directly to `main` or `master`.
    -   ALWAYS start by pulling the latest changes from `main`.
    -   Create a new feature branch for every task or logical unit of work.
        -   Naming convention: `feature/<descriptive-name>` (e.g., `feature/add-new-post`, `feature/update-styles`).

2.  **Commit Standards**:
    -   Write clear, descriptive commit messages.
    -   Group related changes together.
    -   Only commit after verifying your changes locally.

3.  **Pull Request (PR) Workflow**:
    -   Once work is complete and verified locally:
        1.  Stage and commit changes to your feature branch.
        2.  Push the branch to the remote repository.
        3.  Create a Pull Request (PR) targeting `main`.
    -   Wait for USER approval before merging (if applicable in this environment) or leave the PR open for review.

## Workflow

1.  **Start Task**:
    ```powershell
    git checkout main
    git pull origin main
    git checkout -b feature/<task-name>
    ```

2.  **During Development**:
    -   Make changes.
    -   Verify locally (e.g., `.\run_local.ps1`).

3.  **Completion**:
    ```powershell
    git add .
    git commit -m "feat: <description of changes>"
    # Ask for user approval here before pushing if critical
    git push -u origin feature/<task-name>
    # (Optional) Use gh cli or link to create PR
    ```

## Constraints
-   Do not force push to shared branches.
-   Ensure the working directory is clean before switching branches.
