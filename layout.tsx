:root {
  --bg: #f3f0e8;
  --paper: #fbfaf6;
  --panel: #ebe7dc;
  --ink: #181713;
  --muted: #6f6a5f;
  --soft: #a9a195;
  --line: #d9d2c3;
  --line-dark: #c7bdab;
  --button: #25231e;
  --button-hover: #39362f;
  --success: #496b4a;
  --unknown: #8b7b5e;
  --shadow: 0 24px 70px rgba(42, 37, 29, 0.12);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background:
    radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 36%),
    linear-gradient(135deg, #f5f1e8 0%, #e9e1d3 100%);
  color: var(--ink);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

img {
  max-width: 100%;
  display: block;
}

.page {
  min-height: 100vh;
  padding: 28px;
}

.container {
  max-width: 1180px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  color: var(--muted);
  font-family: "Courier New", monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #637a55;
  display: inline-block;
  margin-right: 8px;
}

.hero {
  background: rgba(251, 250, 246, 0.82);
  border: 1px solid var(--line);
  border-radius: 34px;
  padding: 34px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.7fr;
  gap: 32px;
  align-items: end;
}

.kicker {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-family: "Courier New", monospace;
}

h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(2.5rem, 5.8vw, 6.7rem);
  line-height: 0.92;
  letter-spacing: -0.07em;
  font-weight: 720;
}

.hero-text {
  margin: 22px 0 0;
  max-width: 680px;
  color: var(--muted);
  font-size: 1.03rem;
  line-height: 1.75;
}

.upload-panel {
  border: 1px solid var(--line);
  border-radius: 26px;
  background: var(--paper);
  padding: 18px;
}

.upload-title {
  margin: 0 0 12px;
  font-family: "Courier New", monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--muted);
}

.upload-button {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 18px;
  background: var(--button);
  color: #fffaf0;
  padding: 14px 18px;
  font-weight: 650;
  transition: background 0.18s ease, transform 0.18s ease;
}

.upload-button:hover {
  background: var(--button-hover);
  transform: translateY(-1px);
}

.upload-button input {
  display: none;
}

.file-name {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.4;
}

.notice,
.error {
  margin-top: 18px;
  border-radius: 20px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  background: rgba(251, 250, 246, 0.75);
  color: var(--muted);
}

.error {
  border-color: #d7a9a2;
  color: #8d3b32;
}

.workspace {
  margin-top: 22px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 22px;
}

.stack {
  display: grid;
  gap: 22px;
}

.card {
  background: rgba(251, 250, 246, 0.78);
  border: 1px solid var(--line);
  border-radius: 30px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.card-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.card-title {
  margin: 0;
  color: var(--muted);
  font-family: "Courier New", monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.meta-pill {
  border: 1px solid var(--line-dark);
  border-radius: 999px;
  padding: 6px 10px;
  color: var(--muted);
  font-family: "Courier New", monospace;
  font-size: 12px;
}

.image-box {
  min-height: 360px;
  border-radius: 24px;
  border: 1px dashed var(--line-dark);
  background: #f5f2ea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--soft);
  text-align: center;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  max-height: 560px;
  object-fit: contain;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.pill {
  border-radius: 999px;
  border: 1px solid var(--line-dark);
  background: #f7f4ed;
  padding: 8px 12px;
  color: var(--ink);
  font-family: "Courier New", monospace;
  font-size: 0.83rem;
}

.empty {
  margin: 0;
  color: var(--soft);
}

.results-meta {
  margin: 6px 0 0;
  color: var(--soft);
  font-size: 0.94rem;
}

.result-list {
  display: grid;
  gap: 14px;
}

.result-card {
  border: 1px solid var(--line);
  border-radius: 24px;
  background: #f8f6ef;
  padding: 18px;
}

.result-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.ocr-label {
  margin: 0;
  color: var(--soft);
  font-family: "Courier New", monospace;
  font-size: 12px;
}

.result-card h3 {
  margin: 7px 0 0;
  font-size: 1.45rem;
  letter-spacing: -0.035em;
}

.match-pill {
  border-radius: 999px;
  padding: 7px 11px;
  font-family: "Courier New", monospace;
  font-size: 12px;
  white-space: nowrap;
}

.match-pill.found {
  background: #e1eadb;
  color: var(--success);
}

.match-pill.unknown {
  background: #eee8dc;
  color: var(--unknown);
}

.result-text {
  margin: 14px 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.details {
  margin-top: 14px;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 12px 14px;
  background: rgba(255,255,255,0.45);
}

.details summary {
  cursor: pointer;
  color: var(--muted);
  font-family: "Courier New", monospace;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.details p {
  color: var(--muted);
  line-height: 1.7;
}

.raw-text {
  white-space: pre-wrap;
  border-radius: 20px;
  border: 1px solid var(--line);
  background: #f8f6ef;
  padding: 16px;
  color: var(--muted);
  overflow-x: auto;
  font-size: 0.88rem;
  line-height: 1.6;
}

@media (max-width: 920px) {
  .hero-grid,
  .workspace {
    grid-template-columns: 1fr;
  }

  .page {
    padding: 16px;
  }

  .hero {
    padding: 24px;
  }
}