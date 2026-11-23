import { DownloadCard } from "@/components/releases/DownloadCard";
import { ReleaseHero } from "@/components/releases/ReleaseHero";
import { VersionHistory } from "@/components/releases/VersionHistory";
import { getVersionHistory } from "@/lib/releases/history";
import { getLatestRelease } from "@/lib/releases/manifest";

export default function Home() {
  const latestRelease = getLatestRelease();
  const versions = getVersionHistory();
  const installerPath = latestRelease?.installer?.path;
  const installerSize = versions.find((entry) => entry.url === installerPath)?.size;

  return (
    <>
      <main className="flex-1">
        <ReleaseHero release={latestRelease} />
        <DownloadCard release={latestRelease} size={installerSize} />
        <VersionHistory versions={versions} />
      </main>
      <footer className="border-t border-line">
        <div className="content-width py-8 text-center text-[13px] text-muted">
          Ceneyra Inner &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}
