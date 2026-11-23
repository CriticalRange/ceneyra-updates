import { formatInstallerSize } from "@/lib/releases/format";
import type { LatestRelease } from "@/lib/releases/manifest";

export function DownloadCard({
  release,
  size,
}: {
  release: LatestRelease | null;
  size?: number;
}) {
  return (
    <section className="content-width py-12 sm:py-16" aria-labelledby="latest-release">
      <h2 id="latest-release" className="section-label mb-3">
        En güncel sürüm
      </h2>

      <div className="panel overflow-hidden">
        {release?.installer ? (
          <>
            <div className="grid items-center gap-5 p-6 sm:grid-cols-[auto_1fr_auto] sm:gap-6 sm:p-8">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-divider bg-white shadow-sm">
                <svg aria-hidden="true" className="size-8" viewBox="0 0 4875 4875">
                  <path d="M0 0h2311v2310H0zm2564 0h2311v2310H2564zM0 2564h2311v2311H0zm2564 0h2311v2311H2564" />
                </svg>
              </div>

              <div>
                <p className="text-[15px] font-bold text-ink">Windows x64</p>
                <p className="mt-0.5 text-[13px] text-muted">
                  Windows 10/11
                  {size !== undefined && ` • ${formatInstallerSize(size)}`}
                </p>
                <p className="mt-0.5 text-xs text-muted">v{release.version}</p>
              </div>

              <a href={release.installer.url} className="download-button">
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                İndir
              </a>
            </div>

            {release.installer.signature && (
              <div className="flex items-start gap-2.5 border-t border-line bg-surface px-6 py-3 sm:px-8">
                <span className="mt-0.5 shrink-0 text-xs font-bold text-accent">
                  *.sig
                </span>
                <span className="break-all text-[11px] leading-relaxed text-muted">
                  {release.installer.signature.length > 96
                    ? `${release.installer.signature.slice(0, 96)}...`
                    : release.installer.signature}
                </span>
              </div>
            )}
          </>
        ) : (
          <p className="px-6 py-5 text-sm text-muted sm:px-8">
            {release
              ? "Bu sürüm için Windows x64 indirme bağlantısı bulunamadı."
              : "Güncelleme bilgisi okunamadı."}
          </p>
        )}
      </div>
      {release?.installer?.signature && (
        <p className="mt-3 pl-1 text-xs text-muted">
          Bu imza, otomatik güncelleme sırasında yükleyiciyi doğrulamak için kullanılır.
        </p>
      )}
    </section>
  );
}
