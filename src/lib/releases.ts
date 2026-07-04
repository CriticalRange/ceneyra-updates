import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const BASE = "/ceneyra-updates";

export interface Platform {
  signature: string;
  url: string;
}

export interface LatestRelease {
  version: string;
  notes: string;
  pub_date: string;
  platforms: Record<string, Platform>;
}

export interface VersionEntry {
  version: string;
  date: string;
  size: number;
  url: string;
  signature: string;
}

/**
 * Read and parse the latest.json manifest from the public directory.
 */
export function getLatestRelease(): LatestRelease | null {
  try {
    const raw = readFileSync(
      join(process.cwd(), "public", "latest.json"),
      "utf-8"
    );
    return JSON.parse(raw) as LatestRelease;
  } catch {
    return null;
  }
}

/**
 * Parse a version string like "0.3.7" into an array of numbers for comparison.
 */
function parseVersion(v: string): number[] {
  return v.split(".").map(Number);
}

/**
 * Extract version and platform from an exe filename.
 * Pattern: Ceneyra-Inner-X.Y.Z-windows-x86_64-setup.exe
 */
function parseFilename(filename: string): {
  version: string;
  platform: string;
} | null {
  const match = filename.match(
    /^Ceneyra-Inner-(\d+\.\d+\.\d+)-(.+)-setup\.exe$/
  );
  if (!match) return null;
  return { version: match[1], platform: match[2] };
}

/**
 * Format bytes to human-readable string.
 */
export function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

/**
 * Format an ISO date string to a human-readable date.
 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Scan the public/ directory for all .exe release files,
 * pair them with their .sig files, and return a sorted
 * version history (newest first).
 */
export function getVersionHistory(): VersionEntry[] {
  const publicDir = join(process.cwd(), "public");
  let files: string[];
  try {
    files = readdirSync(publicDir);
  } catch {
    return [];
  }

  const exeFiles = files.filter((f) => f.endsWith(".exe"));

  const entries: VersionEntry[] = [];

  for (const exe of exeFiles) {
    const parsed = parseFilename(exe);
    if (!parsed) continue;

    const sigFile = `${exe}.sig`;
    const hasSig = files.includes(sigFile);

    const filePath = join(publicDir, exe);
    const size = statSync(filePath).size;

    entries.push({
      version: parsed.version,
      date: "", // filled below from stat
      size,
      url: `${BASE}/${exe}`,
      signature: hasSig ? `${BASE}/${sigFile}` : "",
    });
  }

  // Sort newest first by version
  entries.sort((a, b) => {
    const va = parseVersion(a.version);
    const vb = parseVersion(b.version);
    for (let i = 0; i < Math.max(va.length, vb.length); i++) {
      const diff = (vb[i] || 0) - (va[i] || 0);
      if (diff !== 0) return diff;
    }
    return 0;
  });

  return entries;
}
