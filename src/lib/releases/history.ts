import "server-only";

import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { publicDirectory, releaseVersionPattern } from "./shared";

export interface VersionEntry {
  version: string;
  platform: string;
  size: number;
  url: string;
  signatureUrl: string | null;
}

const installerFilenamePattern = /^Ceneyra-Inner-([^-]+)-([\w-]+)-setup\.exe$/;

const versionOrder = new Intl.Collator("en", { numeric: true });

export function getVersionHistory(): VersionEntry[] {
  let files: Set<string>;
  try {
    files = new Set(
      readdirSync(publicDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name),
    );
  } catch {
    return [];
  }

  const versions: VersionEntry[] = [];
  for (const filename of files) {
    const match = installerFilenamePattern.exec(filename);
    if (!match) continue;

    const [, version, platform] = match;
    if (!releaseVersionPattern.test(version)) continue;

    try {
      const file = statSync(join(publicDirectory, filename));
      if (!file.isFile() || file.size === 0) continue;

      const signature = `${filename}.sig`;
      versions.push({
        version,
        platform,
        size: file.size,
        url: `/${filename}`,
        signatureUrl: files.has(signature) ? `/${signature}` : null,
      });
    } catch {
      // A missing or unreadable installer should not hide the rest of the archive.
      continue;
    }
  }

  return versions.sort(
    (a, b) => versionOrder.compare(b.version, a.version) || a.platform.localeCompare(b.platform),
  );
}
