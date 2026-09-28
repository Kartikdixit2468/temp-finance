# Event schedule admin setup

The landing page reads its schedule from `public/event.json`. The protected `/admin` page updates that file through the GitHub Contents API. Each save creates a commit on `main`, which starts the normal Vercel production deployment.

## 1. Create a fine-grained GitHub token

1. Open GitHub **Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Create a token owned by the account that owns this repository.
3. Select **Only select repositories** and choose `Youfinanceschool`.
4. Under **Repository permissions**, grant **Contents: Read and write**. Leave every other permission at its minimum/default value.
5. Set a reasonable expiration and copy the token. GitHub shows it only once.

## 2. Generate the admin password hash

Run:

```bash
npm run hash:admin-password
```

Enter the password when prompted. The script does not display the password. Copy the complete `ADMIN_PASSWORD_HASH=...` output.

Generate a separate session secret:

```bash
openssl rand -hex 32
```

## 3. Add Vercel environment variables

In **Vercel → Project → Settings → Environment Variables**, add these values to **Production**:

```text
ADMIN_USERNAME=<the client's username>
ADMIN_PASSWORD_HASH=<the generated scrypt value>
SESSION_SECRET=<the generated 64-character random value>
GITHUB_ADMIN_TOKEN=<the fine-grained GitHub token>
GITHUB_OWNER=omnirtester
GITHUB_REPO=Youfinanceschool
GITHUB_BRANCH=main
GITHUB_EVENT_FILE_PATH=public/event.json
```

Mark `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, and `GITHUB_ADMIN_TOKEN` as sensitive when Vercel offers that option. Never prefix these variables with `VITE_`.

## 4. Redeploy once

Environment-variable changes apply only to new deployments. Redeploy the latest production deployment once after adding the variables.

## 5. Test the admin flow

1. Visit `https://your-domain.com/admin`.
2. Sign in with `ADMIN_USERNAME` and the original password used to generate the hash.
3. Choose an IST event date/time and duration.
4. Select **Save and publish**.
5. Open the generated GitHub commit link, wait for the Vercel production deployment to finish, then reload the landing page.

For additional protection, add a Vercel Firewall rate-limit rule for `/api/admin/login` and rotate the GitHub token before it expires.
