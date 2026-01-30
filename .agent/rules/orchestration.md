# Agent Rules

This file defines the rules for the agent to follow when handling user requests in this workspace.

## Skill Routing

### Git Workflow
- **Trigger**: FOR ALL CHANGES (Code or Content).
- **Action**: Use the `git-workflow` skill.
- **Context**: 
    1.  **Checkout main & Pull**: Always start by updating `main`.
    2.  **Create Feature Branch**: `git checkout -b feature/<descriptive-name>`.
    3.  **Commit**: Only commit to the feature branch.
    4.  **PR**: Push the branch and create a Pull Request (PR) for review. DO NOT merge to main directly.

### Technical Writer
- **Trigger**: When the user requests a new blog post, article drafting, content review, or documentation updates.
- **Action**: Use the `technical-writer` skill.
- **Context**: Focus on content quality, markdown structure, and clarity. Do not modify site structure or configuration unless explicitly asked.

### Jekyll Developer
- **Trigger**: When the user requests changes to the site's layout, theme, CSS, configuration (`_config.yml`), or build process.
- **Action**: Use the `jekyll-developer` skill.
- **Context**: Focus on code (HTML/Liquid/CSS/JS), site performance, and build stability. Ensure changes don't break existing content rendering.

## General Workflow

1.  **Analysis**: Determine if the request is content-centric (Technical Writer) or structure-centric (Jekyll Developer).
2.  **Execution**: Apply the appropriate skill's guidelines.
3.  **Verification**: ensure that content renders correctly and the site builds without errors.

## Specific Constraints

-   **LinkedIn Posts**: Note that `linkedin-posts` are excluded from the main build. Content intended for the live blog must go into `_posts`.
-   **Local Testing**: Use `run_local.ps1` to verify changes visually before finalizing.
