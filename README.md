# Posture Pulse

Mac desktop wrapper for the posture correction webcam app.

## Run on macOS

```bash
npm install
npm start
```

The app asks for camera permission on first launch. Keep the app open while monitoring posture.

## Build a Mac app

```bash
npm install
npm run dist:mac
```

The packaged `.dmg` and `.zip` outputs are created under `dist/`.

## Download a Mac app from GitHub Actions

1. Open the repository on GitHub.
2. Go to **Actions**.
3. Open the latest **Build macOS app** run.
4. Download the **posture-pulse-macos** artifact.
5. Unzip it and open the `.dmg` file.

## Login start on macOS

After building/installing the app, open **System Settings → General → Login Items** and add **Posture Pulse** to **Open at Login**.

## Tests

```bash
npm test
```
