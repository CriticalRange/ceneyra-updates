import { join } from "node:path";

export const publicDirectory = join(process.cwd(), "public");
export const releaseVersionPattern = /^\d+\.\d+\.\d+$/;
export const windowsPlatform = "windows-x86_64";
