const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const root = path.join(__dirname, "..");

test("package.json exposes Electron macOS app commands", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

  assert.equal(pkg.main, "electron/main.js");
  assert.equal(pkg.scripts.start, "electron .");
  assert.match(pkg.scripts["dist:mac"], /electron-builder --mac/);
  assert.equal(pkg.build.productName, "Posture Pulse");
});

test("Electron main process loads the local posture page", () => {
  const main = fs.readFileSync(path.join(root, "electron", "main.js"), "utf8");

  assert.match(main, /loadFile\(path\.join\(__dirname, "\.\.", "index\.html"\)\)/);
  assert.match(main, /backgroundThrottling: false/);
  assert.match(main, /askForMediaAccess\("camera"\)/);
});

test("existing web app assets remain available", () => {
  for (const file of ["index.html", "manifest.json", "sw.js", "icon-192.png", "icon-512.png"]) {
    assert.equal(fs.existsSync(path.join(root, file)), true, `${file} should exist`);
  }
});

test("GitHub Actions builds macOS distributable artifacts", () => {
  const workflow = fs.readFileSync(
    path.join(root, ".github", "workflows", "build-mac.yml"),
    "utf8"
  );

  assert.match(workflow, /runs-on: macos-latest/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run dist:mac/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
});
