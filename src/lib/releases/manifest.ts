import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { publicDirectory, releaseVersionPattern, windowsPlatform } from "./shared";

interface Installer {
  url: string;
  path: string;
  signature: string | null;
}

export interface LatestRelease {
  version: string;
  publishedAt: Date | null;
  installer: Installer | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readInstaller(value: unknown): Installer | null {
  if (!isRecord(value) || typeof value.url !== "string" || !URL.canParse(value.url)) {
    return null;
  }

  const url = new URL(value.url);
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  return {
    url: url.href,
    path: url.pathname,
    signature: typeof value.signature === "string" ? value.signature.trim() || null : null,
  };
}

export function getLatestRelease(): LatestRelease | null {
  let manifest: unknown;
  try {
    const raw = readFileSync(join(publicDirectory, "latest.json"), "utf8");
    manifest = JSON.parse(raw.replace(/^\uFEFF/, ""));
  } catch {
    return null;
  }

  if (
    !isRecord(manifest) ||
    typeof manifest.version !== "string" ||
    !releaseVersionPattern.test(manifest.version)
  ) {
    return null;
  }

  const publishedAt = typeof manifest.pub_date === "string"
    ? new Date(manifest.pub_date)
    : null;
  const platforms = isRecord(manifest.platforms) ? manifest.platforms : {};

  return {
    version: manifest.version,
    publishedAt: publishedAt && Number.isFinite(publishedAt.getTime()) ? publishedAt : null,
    installer: readInstaller(platforms[windowsPlatform]),
  };
}
