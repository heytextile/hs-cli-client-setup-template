# HubSpot CMS Workspace – Daily Workflow (Multi-Client)

[Note on Folder Structure]

This template includes `prod/` and `sandbox/` folders, which are intended to store all themes and files downloaded from your client's production and sandbox HubSpot portals. These folders are initially empty except for a `.gitkeep` file, which ensures Git tracks the folders even when they have no content. After running your sync/download commands, these folders will be populated with the actual client files. Do not remove the `.gitkeep` files unless the folders contain other files.

## 🚩 Post-Clone Setup Checklist

After cloning this template, complete the following steps to configure for your client:

1. **Update Placeholders:**

   - Search for all `{{CLIENT_NAME}}`, `{{CLIENT_PORTAL_PROD}}`, `{{CLIENT_PORTAL_SANDBOX}}`, `{{CLIENT_BRAND}}`, and similar placeholders in all files.
   - Replace with your client’s actual values.

2. **Create Sandbox Portal:**

   - In your HubSpot account, create a sandbox portal for development and testing.
   - Use the HubSpot CLI (`hs auth`) to authenticate and add the sandbox portal to your `hubspot.config.yml`.
   - Update all references to `{{CLIENT_PORTAL_SANDBOX}}` with your new sandbox portal ID.

3. **Rename Folders:**

   - Update folder names (e.g., `Textile_Heirloom`, `Textile_NovaFlex`) to your client’s brand or project names.
   - Update any references to these folders in configs and code.

4. **Create Workspace File:**

   - After configuration, open VS Code’s command palette and select `File: Save Workspace As...` to create a new workspace file named for your client/project.
   - This keeps the template repo clean and ensures your workspace file is client-specific.

5. **Review Config Files:**

   - Update `hubspot.config.yml` and any authentication files for your client’s portal IDs and credentials.

6. **Check for Sensitive Data:**

   - Ensure no old API keys, secrets, or credentials remain. Replace or remove as needed.

7. **Test CLI Commands:**
   - Run the CLI commands in this readme to confirm everything works for your client setup.

---

This repo contains code and configuration for both production and sandbox HubSpot portals for any client. Use the instructions below for daily operations in this workspace. Replace all placeholders (e.g., `{{CLIENT_NAME}}`, `{{CLIENT_PORTAL}}`) with your client-specific values.

---

## 1. Sync Local Workspace with GitHub

First, we want to confirm that we have the same code locally that the online repo has. This really does not apply if you're working by yourself, because generally changes made are made locally anyway. But this step is a good practice for times when multiple devs might be in the repo.

**Command Line - Commit local changes:**

```sh
git add .
git commit -m "Your local changes"
```

**GitHub Desktop - Commit local changes:**

1. Review changes and add a commit message.
2. Click "Commit to main" and "Push origin".

**Command Line - Pull remote changes:**

```sh
git pull
```

**GitHub Desktop - Pull remote changes:**

1. Open GitHub Desktop.
2. Click "Fetch origin" to pull the latest changes.

If there are conflicts, Git will pause to resolve conflicts.

---

## 2. Fetch Latest from Production Portal

Use the HubSpot CLI to fetch the latest code from production. This will overwrite local files with what’s live in production.

```sh
hs cms fetch --account={{CLIENT_PORTAL_PROD}} "/" --overwrite --config=hubspot.config.yml
```

Review changes:

```sh
git status   # See which files changed
git diff     # See line-by-line changes
```

If changes are correct, commit them:

```sh
git add .
git commit -m "Sync: fetch from production"
git push
```

You can also use GitHub Desktop for these steps.

---

## 3. Start Development in Sandbox (Watch Mode)

Upload your local code to the sandbox portal. Open terminal in the sandbox folder (or change directories), then:

```sh
hs cms upload . --account={{CLIENT_PORTAL_SANDBOX}} --config=hubspot.config.yml
```

Start watch mode for instant preview and auto-upload on save:

```sh
hs cms watch --account={{CLIENT_PORTAL_SANDBOX}} --config=hubspot.config.yml
```

---

## 4. Stop Watch and Commit Changes

When done editing, stop watch mode (press `Ctrl+C` in the terminal).

Commit your changes to Git:

```sh
git add .
git commit -m "feat: your message here"
git push
```

**GitHub Desktop:**

1. Open GitHub Desktop.
2. Review changes in the "Changes" tab.
3. Add a commit message.
4. Click "Commit to main" and "Push origin".

---

## 5. Upload Changes to Production

When ready to deploy to the live site, upload your code to the production portal. Open terminal in the prod folder (or change directories), then:

```sh
hs cms upload . --account={{CLIENT_PORTAL_PROD}} --config=hubspot.config.yml
```

---

**Notes:**

- Always use the `--config=hubspot.config.yml` flag to ensure you’re using the workspace-specific authentication and portal setup.
- By default, the workspace config is set to sandbox for safety. Specify `--account={{CLIENT_PORTAL_PROD}}` only when you intend to deploy to production.

---

**End of Workflow Instructions**
