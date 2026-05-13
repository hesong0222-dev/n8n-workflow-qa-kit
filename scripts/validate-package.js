const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const workflowDir = path.join(root, "workflows");
const docsDir = path.join(root, "docs");

const requiredFiles = [
  "README.md",
  "PRODUCT_LISTING.md",
  "index.html",
  "docs/qa-checklist.md",
  "docs/import-and-test.md",
  "docs/client-delivery-template.md",
  "workflows/qa-harness-manual.json",
  "workflows/error-handler-starter.json",
  "workflows/async-job-queue-skeleton.json",
];

const secretPatterns = [
  /sk-[A-Za-z0-9_-]{16,}/,
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/i,
  /authorization\s*[:=]\s*['"]bearer\s+[^'"]+['"]/i,
  /password\s*[:=]\s*['"][^'"]+['"]/i,
  /secret\s*[:=]\s*['"][^'"]+['"]/i,
];

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    fail(`Missing required file: ${file}`);
  }
}

for (const file of fs.readdirSync(workflowDir).filter((name) => name.endsWith(".json"))) {
  const fullPath = path.join(workflowDir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(`${file} is not valid JSON: ${error.message}`);
    continue;
  }

  if (typeof parsed.name !== "string" || !parsed.name.trim()) {
    fail(`${file} is missing workflow name`);
  }
  if (!Array.isArray(parsed.nodes) || parsed.nodes.length === 0) {
    fail(`${file} has no nodes`);
  }
  if (!parsed.connections || typeof parsed.connections !== "object") {
    fail(`${file} is missing connections`);
  }
  if (raw.includes('"credentials"')) {
    fail(`${file} contains credentials; remove before selling`);
  }
  for (const pattern of secretPatterns) {
    if (pattern.test(raw)) {
      fail(`${file} matches secret-like pattern ${pattern}`);
    }
  }
}

for (const dir of [root, docsDir]) {
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(raw)) {
        fail(`${file} matches secret-like pattern ${pattern}`);
      }
    }
  }
}

if (process.exitCode) {
  process.exit();
}

console.log("Package validation passed: required files, workflow JSON shape, and secret scan are clean.");
