# Cryol content publishing

The CMS is free, open-source Decap CMS. It stores Markdown and images in GitHub; no CMS database or TinaCloud subscription is required.

## For editors: add a blog or case study

1. Visit https://www.cryol.in/int_ad/CMS/v1/auth/login after the connection below is completed.
2. Choose **Login with GitHub** using an approved account.
3. Choose **Blogs** or **Case Studies**, then **New**.
4. Enter the title, summary, date and article content. Add images and related services if useful.
5. Keep **Publish on website** switched off to save a draft.
6. When ready, turn **Publish on website** on and use Decap's **Publish now** action.
7. Wait for the connected Vercel deployment to finish. Then open the article on the website.

Every save in this simple workflow commits to the configured GitHub branch. A draft can therefore trigger a deployment, but the public site excludes it. This is a simple draft flag, not a separate review/approval or scheduled-publishing system.

Use **Sign out of Cryol CMS** when finished. This clears the server session and Decap's saved browser login. If GitHub sign-in opens a popup, allow that popup for this website.

The website generates the page layout, URL, SEO defaults, social metadata, article structured data, sitemap entry and project enquiry links automatically. The CMS preview shows the content; it is not an exact copy of the public website design. Unpublished articles deliberately return 404 on the public site.

## One-time GitHub connection

Repository discovered in this workspace: iamraghavan/Cryol. Publishing branch: main.

1. In GitHub Developer settings, register an OAuth App: https://github.com/settings/applications/new
2. Set the homepage to https://www.cryol.in.
3. Set the callback URL to exactly:

   https://www.cryol.in/int_ad/CMS/v1/auth/callback

4. Add the OAuth Client ID and Client Secret to the hosting provider's server environment variables. Do not commit them or paste them into article content.
5. Set CMS_GITHUB_ALLOWED_USERS to a comma-separated list of approved GitHub usernames. Initially only iamraghavan is allowed in the local setup. Every editor also needs repository write access.
6. Use a separate OAuth App for local testing. Its homepage is http://localhost:9002 and its callback is http://localhost:9002/int_ad/CMS/v1/auth/callback.

Required environment:

    CMS_SITE_URL=https://www.cryol.in
    CMS_GITHUB_REPO=iamraghavan/Cryol
    CMS_GITHUB_BRANCH=main
    CMS_GITHUB_REPO_VISIBILITY=private
    CMS_GITHUB_ALLOWED_USERS=iamraghavan
    CMS_GITHUB_CLIENT_ID=<from GitHub OAuth App>
    CMS_GITHUB_CLIENT_SECRET=<from GitHub OAuth App>
    CMS_SESSION_SECRET=<random server-only value, at least 32 characters>

Choose public visibility only if the repository is public. It requests GitHub's public_repo scope instead of repo. GitHub OAuth scopes apply to repositories the account can access, not just one content folder. Use appropriate editor accounts and review the OAuth permission screen.

The local session secret is generated in ignored .env.local. The OAuth client credentials are intentionally not fabricated; login remains unavailable until they are configured. GitHub two-factor authentication should be enabled for editors; this app does not replace or bypass GitHub's login security.

## Vercel

1. Import/connect iamraghavan/Cryol to Vercel and use main as the production branch.
2. Use the normal Next.js build (npm run build).
3. Set SITE_URL and CMS_SITE_URL to the exact deployed origin.
4. Add the server environment variables above. Keep all client secrets and CMS_SESSION_SECRET server-only.
5. Keep automatic deployments from GitHub commits enabled. Deploy this code before signing into the CMS.
6. Test one draft save, then publish a genuine article and confirm the deployment and generated page.

For preview domains, use separately configured OAuth callback/origin settings; unknown origins are not automatically trusted. CMS software is free; hosting and provider usage follow the relevant plans.

Enquiry storage/email is a separate feature. Its Firebase, Gmail, CSRF and Turnstile configuration is described in enquiry-setup.md.

## Manual GitHub editing

- Blog files: content/blog/my-article.md
- Case studies: content/case-studies/my-project.md
- Images: public/uploads/
- Filenames: lowercase words separated by hyphens.

Copy a template from docs/content-templates/, write the content and commit. Keep dates quoted as YYYY-MM-DD. published must be the boolean true or false, not quoted text. Raw HTML in article bodies is not rendered. Use ordinary Markdown headings, links, lists and images.

The existing planning article was migrated to Markdown without changing its URL. The case-study template is unpublished and contains no invented client results.

## Security and operational details

- CMS paths use /int_ad/CMS/v1/; the public website does not load the CMS JavaScript.
- OAuth uses random state, PKCE, a signed HttpOnly state cookie, fixed callback origins and token exchange on the server.
- Sign-in checks the configured GitHub username allowlist and repository push permission.
- Dashboard access uses an expiring signed HttpOnly session. Browser sessions are checked periodically and cleared when expired.
- The standard Decap GitHub backend stores its GitHub access token in browser local storage. The OAuth client secret and session-signing secret never enter the client configuration. Use trusted devices and sign out after editing.
- CMS pages use no-store responses, noindex headers and a separate CSP that permits GitHub API requests and editor previews without broadening the public site's policy.
- The dashboard exposes two collections, but GitHub repository write access itself is broader than that interface. The CMS collection configuration is not a separate per-folder GitHub permission boundary.
- Decap 3.17.1 and its lazy-loaded chunks are vendored from npm under public/int_ad/CMS/v1/assets/. Update the whole bundle/chunk set together; do not edit minified vendor code.
- Automated tests use fake OAuth settings and simulated GitHub responses; they never publish content or exchange a real GitHub token.

References:

- https://decapcms.org/docs/github-backend/
- https://decapcms.org/docs/manual-initialization/
- https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
