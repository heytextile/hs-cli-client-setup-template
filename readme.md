# HubSpot CMS Workspace – Daily Workflow (Multi-Client)

## Workspace Variables

Open [replacements.json](/scripts/replacements.json) to update workspace variables. Run script to swap variables, then open the [cheat-sheet](/cheat-sheet.md):

```sh
python3 scripts/replace_tokens.py scripts/replacements.json readme.md cheat-sheet.md
```

> Authorize CLI with portal: `hs account auth`

> Navigate to root directory: `cd ~ GIT_local/vs-profiles-hs/{{ROOT_DIR}}`

> Navigate to prod directory: `cd ~ GIT_local/vs-profiles-hs/{{ROOT_DIR}}/prod`

> Navigate to sandbox directory `cd ~ GIT_local/vs-profiles-hs/{{ROOT_DIR}}/sandbox`

> Fetch production from root: `hs cms fetch "/" account={{PROD_PORTAL_NAME}} --overwrite`

> Fetch sandbox from root: `hs cms fetch "/" account={{SANDBOX_PORTAL_NAME}} --overwrite`

> Target directory flag - prod: `--dest=GIT_local/vs-profiles-hs/{{ROOT_DIR}}/prod`

> Target directory flag - sandbox: `--dest=GIT_local/vs-profiles-hs/{{ROOT_DIR}}/sandbox`

> Watch sandbox: `hs cms watch --account={{SANDBOX_PORTAL_NAME}}`

> Upload sandbox `hs cms upload . --account={{SANDBOX_PORTAL_NAME}} --overwrite`

| Field               | Value                     |
| ------------------- | ------------------------- |
| CLIENT_NAME         | `{{CLIENT_NAME}}`         |
| PROD_PORTAL_NAME    | `{{PROD_PORTAL_NAME}}`    |
| PROD_PORTAL_ID      | `{{PROD_PORTAL_ID}}`      |
| SANDBOX_PORTAL_NAME | `{{SANDBOX_PORTAL_NAME}}` |
| SANDBOX_PORTAL_ID   | `{{SANDBOX_PORTAL_ID}}`   |

## 🚩 Post-Clone Setup Checklist

After cloning this template, complete the following steps to configure for your client:

1. **Client Production Portal:**

   - Use the HubSpot CLI (`hs account auth`) to authenticate and add the client's production portal to your global `hubspot.config.yml`.

2. **Private Sandbox Portal:**

   - In your HubSpot Developer account, create a sandbox portal for development and testing.
   - Use the HubSpot CLI (`hs account auth`) to authenticate and add the sandbox portal to your global `hubspot.config.yml`.

3. **Update Workspace Variables:**

   - See [Workspace Variables](#workspace-variables)

4. **Create Workspace File:**

   - After configuration, open VS Code’s command palette and select `File: Save Workspace As...` to create a new workspace file named for your client/project.
   - This keeps the template repo clean and ensures your workspace file is client-specific.

===

# Daily Workflow

## 1. Sync Local Workspace with GitHub

First, we want to confirm that we have the same code locally that the online repo has. This really does not apply if you're working by yourself, because generally changes made are made locally anyway. But this step is a good practice for times when multiple devs might be in the repo. To make conflicts easier to deal with, always push local changes before pulling online changes.

**Commit local changes:**

| Command Line                              | GitHub Desktop                               |
| ----------------------------------------- | -------------------------------------------- |
| `git add . `                              | 1. Review changes and add a commit message.  |
| `git commit -m "[local changes comment]"` | 2. Click "Commit to main" and "Push origin". |

**Pull remote changes:**

| Command Line | GitHub Desktop                                      |
| ------------ | --------------------------------------------------- |
| `git pull `  | 1. Click "Fetch origin" to pull the latest changes. |

If there are conflicts, Git will pause to resolve conflicts.

## 2. Fetch Latest from Production Portal

Use the HubSpot CLI to fetch the latest code from production. This will overwrite local files with what’s live in production.

```sh
hs cms fetch --account={{PROD_PORTAL_NAME}} "/" --overwrite
```

Review changes:

```sh
git status   # See which files changed
git diff     # See line-by-line changes
```

If changes are correct, commit them:

| Command Line                              | GitHub Desktop                               |
| ----------------------------------------- | -------------------------------------------- |
| `git add . `                              | 1. Review changes and add a commit message.  |
| `git commit -m "[local changes comment]"` | 2. Click "Commit to main" and "Push origin". |

---

## 3. Start Development in Sandbox (Watch Mode)

Upload your local code to the sandbox portal. Open terminal in the sandbox folder (or change directories), then:

```sh
cd GIT_local/vs-profiles-hs/{{ROOT_DIR}}/sandbox
hs cms upload . --account={{SANDBOX_PORTAL_NAME}}
```

Start watch mode for instant preview and auto-upload on save:

```sh
hs cms watch --account={{SANDBOX_PORTAL_NAME}}
```

---

## 4. Stop Watch and Commit Changes

When done editing, stop watch mode (press `Ctrl+C` in the terminal).

Commit your changes to Git:

| Command Line                              | GitHub Desktop                               |
| ----------------------------------------- | -------------------------------------------- |
| `git add . `                              | 1. Review changes and add a commit message.  |
| `git commit -m "[local changes comment]"` | 2. Click "Commit to main" and "Push origin". |

---

## 5. Upload Changes to Production

When ready to deploy your tested sandbox changes to the live site:

1. **Upload local sandbox files to the production portal:**

   ```sh
   cd GIT_local/vs-profiles-hs/{{ROOT_DIR}}/sandbox
   hs cms upload . --account={{PROD_PORTAL_NAME}}
   ```

2. **Sync production portal back to local prod directory:**

   ```sh
   cd GIT_local/vs-profiles-hs/{{ROOT_DIR}}/prod
   hs cms fetch "/" --account={{PROD_PORTAL_NAME}} --overwrite
   ```

3. **Commit and push changes to Git for version control:**

| Command Line                              | GitHub Desktop                               |
| ----------------------------------------- | -------------------------------------------- |
| `git add . `                              | 1. Review changes and add a commit message.  |
| `git commit -m "[local changes comment]"` | 2. Click "Commit to main" and "Push origin". |

---

**Notes:**

- By default, the workspace config is set to sandbox for safety. Specify `--account={{PROD_PORTAL_NAME}}` only when you intend to deploy to production.
- This workflow ensures your local `prod` directory always matches what is live in production and maintains a clear version history.

---

**End of Workflow Instructions**
