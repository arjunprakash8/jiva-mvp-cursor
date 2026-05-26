# Deploy JIVA UI preview to Vercel

Web preview only — mock vitals, no real BLE. Use this to see the app design in a browser while waiting for the iOS SDK.

## 1. Push code to GitHub

```bash
cd ~/Projects/jiva-mvp
git add .
git commit -m "Add Vercel web preview export"
git push -u origin cursor/cssble-sdk-android-setup
```

Repo URL: **https://github.com/arjunprakash8/jiva-mvp-cursor**

## 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with **GitHub**
3. Click **Import** next to **`arjunprakash8/jiva-mvp-cursor`**
4. If you don’t see it, click **Adjust GitHub App Permissions** and grant access to the repo

## 3. Vercel project settings

These are already in `vercel.json` — confirm they match:

| Setting | Value |
|---------|--------|
| **Framework Preset** | Other |
| **Build Command** | `npm run build:web` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

## 4. Deploy

Click **Deploy**. First build takes ~2–3 minutes.

Your live URL will look like: **`https://jiva-mvp-cursor.vercel.app`**

## 5. What works on web

- Landing, login, signup flow
- All 6 dashboard screens
- Mock live vitals (`MOCK_MODE`)
- Animations, charts, ECG wave (synthetic)

## 6. What does NOT work on web

- Real Bluetooth / CSSBle SDK
- Native phone sensors
- App Store / Play Store install

## Preview locally before Vercel

```bash
npm install
npm run start:web
```

Open the URL shown in the terminal (usually `http://localhost:8081`).
