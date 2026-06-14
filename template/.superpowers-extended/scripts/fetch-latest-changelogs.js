#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const process = require('process');

const DEFAULT_OWNER = 'transparent-pegasus';
const DEFAULT_REPO = 'superpowers-extended';
const DEFAULT_REF = 'main';
const DEFAULT_DEST = path.join('.superpowers-extended', 'changelogs');
const USER_AGENT = 'superpowers-extended-changelog-fetcher';

function usage() {
  return `Usage: node .superpowers-extended/scripts/fetch-latest-changelogs.js [options]

Fetch the latest superpowers-extended changelog files into a target repository.

Options:
  --owner <owner>   GitHub repository owner (default: ${DEFAULT_OWNER})
  --repo <repo>     GitHub repository name (default: ${DEFAULT_REPO})
  --ref <ref>       Git ref, branch, tag, or SHA (default: ${DEFAULT_REF})
  --dest <path>     Destination directory (default: ${DEFAULT_DEST})
  --help            Show this help text
`;
}

function parseArgs(argv) {
  const options = {
    owner: DEFAULT_OWNER,
    repo: DEFAULT_REPO,
    ref: DEFAULT_REF,
    dest: DEFAULT_DEST
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--owner' || arg === '--repo' || arg === '--ref' || arg === '--dest') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error(`${arg} requires a value`);
      }

      options[arg.slice(2)] = value;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function headers(accept) {
  const result = {
    'Accept': accept,
    'User-Agent': USER_AGENT
  };

  if (process.env.GITHUB_TOKEN) {
    result.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return result;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: headers('application/vnd.github+json')
  });

  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchBlob(entry) {
  const blob = await fetchJson(entry.url);
  if (blob.encoding !== 'base64' || typeof blob.content !== 'string') {
    throw new Error(`Unsupported blob encoding for ${entry.path}`);
  }

  return Buffer.from(blob.content.replace(/\s/g, ''), 'base64');
}

function resolveDestination(dest) {
  const destination = path.resolve(dest);
  const cwd = process.cwd();
  const supportDirectory = path.resolve('.superpowers-extended');
  const root = path.parse(destination).root;

  if (destination === root || destination === cwd) {
    throw new Error(`Refusing to replace unsafe destination: ${dest}`);
  }

  if (!destination.startsWith(`${supportDirectory}${path.sep}`)) {
    throw new Error(`Destination must be inside .superpowers-extended/: ${dest}`);
  }

  return destination;
}

async function refreshChangelogs(options) {
  if (typeof fetch !== 'function') {
    throw new Error('This script requires Node.js 18 or newer because it uses global fetch.');
  }

  const treeUrl = `https://api.github.com/repos/${options.owner}/${options.repo}/git/trees/${encodeURIComponent(options.ref)}?recursive=1`;
  const tree = await fetchJson(treeUrl);
  const files = tree.tree
    .filter(entry => entry.type === 'blob' && entry.path.startsWith('changelogs/'))
    .sort((left, right) => left.path.localeCompare(right.path));

  if (files.length === 0) {
    throw new Error(`No files found under changelogs/ in ${options.owner}/${options.repo}@${options.ref}`);
  }

  const destination = resolveDestination(options.dest);
  await fs.rm(destination, { recursive: true, force: true });
  await fs.mkdir(destination, { recursive: true });

  for (const file of files) {
    const relativePath = file.path.slice('changelogs/'.length);
    const outputPath = path.join(destination, relativePath);
    const content = await fetchBlob(file);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, content);
  }

  return { destination, count: files.length };
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) {
      process.stdout.write(usage());
      return;
    }

    const result = await refreshChangelogs(options);
    console.log(`Fetched ${result.count} changelog file(s) into ${result.destination}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}
