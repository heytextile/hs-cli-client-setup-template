# Textile HubSpot CMS Workspace – Daily Workflow

This repo contains all code and configuration for both production and sandbox HubSpot portals for the Textile client. Use the instructions below for daily operations in this workspace.

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
hs cms fetch --account=textile-prod "/" --overwrite --config=hubspot.config.yml
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

Here, again, github desktop can also be used

---

## 3. Start Development in Sandbox (Watch Mode)

Upload your local code to the sandbox portal. Open terminal in the sandbox folder (or change directories), then:

```sh
hs cms upload . --account=textile-cms-sandbox --config=hubspot.config.yml
```

Start watch mode for instant preview and auto-upload on save:

```sh
hs cms watch --account=textile-cms-sandbox --config=hubspot.config.yml
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
hs cms upload . --account=textile-prod --config=hubspot.config.yml
```

---

**Notes:**

- Always use the `--config=hubspot.config.yml` flag to ensure you’re using the workspace-specific authentication and portal setup.
- By default, the workspace config is set to sandbox for safety. Specify `--account=textile-prod` only when you intend to deploy to production.

---

**End of Workflow Instructions**
