const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const workflowDir = path.join(root, "workflows");

const requiredFiles = [
  "README.md",
  "PRODUCT_LISTING.md",
  "index.html",
  "docs/ebook/n8n-client-delivery-playbook.md",
  "docs/ebook/n8n-client-delivery-playbook.html",
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

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
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

for (const file of walkFiles(root).filter((name) => /\.(md|html|json|js)$/i.test(name))) {
  if (file.includes(`${path.sep}.git${path.sep}`)) {
    continue;
  }
  const raw = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  for (const pattern of secretPatterns) {
    if (pattern.test(raw)) {
      fail(`${relative} matches secret-like pattern ${pattern}`);
    }
  }
}

if (process.exitCode) {
  process.exit();
}

console.log("Package validation passed: required files, workflow JSON shape, and secret scan are clean.");
