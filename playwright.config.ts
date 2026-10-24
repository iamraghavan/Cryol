import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:3000', headless: true },
  workers: 1,
  webServer: {
    command: 'npm run start -- -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    env: {
      SITE_URL: 'http://localhost:3000', GMAIL_USER: '', GMAIL_APP_PASSWORD: '', ENQUIRY_RATE_LIMIT_SECRET: '', TURNSTILE_SECRET_KEY: '',
      ENQUIRY_CSRF_SECRET: 'test-only-csrf-signing-secret-at-least-thirty-two-characters',
      CMS_SITE_URL: 'http://localhost:3000', CMS_GITHUB_CLIENT_ID: 'test-client-id', CMS_GITHUB_CLIENT_SECRET: 'test-client-secret',
      CMS_SESSION_SECRET: 'test-only-session-secret-at-least-thirty-two-characters', CMS_GITHUB_ALLOWED_USERS: 'editor', CMS_GITHUB_REPO_VISIBILITY: 'private',
    },
    timeout: 60000,
  },
});
