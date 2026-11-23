import { formatInstallerSize } from "@/lib/releases/format";
import type { VersionEntry } from "@/lib/releases/history";
import { windowsPlatform } from "@/lib/releases/shared";

export function VersionHistory({ versions }: { versions: VersionEntry[] }) {
  if (versions.length === 0) return null;

  return (
    <section className="content-width py-12 sm:py-16" aria-labelledby="version-history">
      <h2 id="version-history" className="section-label mb-4">
        Sürüm geçmişi
      </h2>

      <div className="panel overflow-hidden">
        <table className="w-full">
          <thead className="section-label border-b border-line bg-surface">
            <tr>
              <th scope="col" className="w-full py-2.5 pl-6 pr-2 text-left">Sürüm</th>
              <th scope="col" className="px-2 py-2.5 text-right">Boyut</th>
              <th scope="col" className="py-2.5 pl-2 pr-6 text-right">Dosya</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((entry) => (
              <tr key={entry.url} className="border-b border-divider transition-colors last:border-b-0 hover:bg-surface">
                <th scope="row" className="py-3 pl-6 pr-2 text-left text-sm font-bold text-ink">
                  v{entry.version}
                  {entry.platform !== windowsPlatform && (
                    <span className="ml-2 text-xs font-normal text-muted">{entry.platform}</span>
                  )}
                </th>
                <td className="whitespace-nowrap px-2 py-3 text-right text-[13px] tabular-nums text-muted">
                  {formatInstallerSize(entry.size)}
                </td>
                <td className="py-3 pl-2 pr-6">
                  <div className="flex justify-end gap-3">
                    <a
                      href={entry.url}
                      aria-label={`v${entry.version} ${entry.platform} yükleyicisini indir`}
                      className="text-[13px] font-bold text-accent transition-colors hover:text-accent-hover"
                    >
                      .exe
                    </a>
                    {entry.signatureUrl ? (
                      <a
                        href={entry.signatureUrl}
                        aria-label={`v${entry.version} ${entry.platform} güncelleme imzasını indir`}
                        className="text-xs text-muted transition-colors hover:text-ink"
                      >
                        .sig
                      </a>
                    ) : (
                      <span className="text-xs text-muted" aria-label="İmza dosyası yok">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
