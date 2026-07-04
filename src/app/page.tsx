import {
  getLatestRelease,
  getVersionHistory,
  formatBytes,
  formatDate,
} from "@/lib/releases";

/* ============================================
   Ceneyra Inner — Güncelleme Portalı
   Ana uygulama ile aynı tasarım dili:
   sıcak bej, yumuşak gölge, glass panel,
   zümrüt yeşili aksan, büyük radius.
   ============================================ */

function Hero({ version, date }: { version: string; date: string }) {
  return (
    <section className="relative overflow-hidden border-b border-[#d8d6ce]">
      <div className="relative mx-auto max-w-4xl px-6 pt-6 pb-16 sm:pb-20">
        {/* Version badge */}
        <div className="enter-1 mb-6 inline-flex items-center gap-2 rounded-full border border-[#d8d6ce] bg-white/80 px-4 py-1.5 backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-[#059669]" />
          <span className="text-[13px] font-semibold text-[#60636a]">
            v{version} &mdash; {formatDate(date)}
          </span>
        </div>

        <h1 className="enter-2 mb-4 text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111113]">
          Ceneyra Inner{" "}
          <span className="text-[#059669]">İndirmeleri</span>
        </h1>

        <p className="enter-3 mb-0 text-[16px] leading-relaxed text-[#60636a]">
          Aşağıda Ceneyra Inner için indirmeleri bulabilirsiniz.
        </p>
      </div>
    </section>
  );
}

function DownloadCard({
  version,
  size,
  url,
  signature,
}: {
  version: string;
  size: number;
  url: string;
  signature: string;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#60636a]">
        En güncel sürüm
      </p>

      {/* Glass panel card */}
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-6 p-6 sm:p-8 items-center">
          {/* Windows logo — big, standalone */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#ecebe6]">
            <svg
              className="h-8 w-8"
              viewBox="0 0 4875 4875"
            >
              <path d="M0 0h2311v2310H0zm2564 0h2311v2310H2564zM0 2564h2311v2311H0zm2564 0h2311v2311H2564" />
            </svg>
          </div>

          {/* Platform info */}
          <div>
            <div className="text-[15px] font-bold text-[#111113]">
              Windows x64
            </div>
            <div className="text-[13px] text-[#60636a] mt-0.5">
              Windows 10/11 &bull;{" "}
              {size > 0 ? formatBytes(size) : "~5 MB"}
            </div>
            <div className="text-[12px] text-[#60636a] mt-0.5">
              v{version}
            </div>
          </div>

          {/* Download button */}
          <a
            href={url}
            className="flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-[14px] font-bold text-white shrink-0 select-none transition-all hover:-translate-y-px"
            style={{
              background:
                "linear-gradient(165deg, #101113, #1d1e22 48%, #08090a)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 14px 30px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <svg
              className="h-4 w-4"
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

        {/* Signature row */}
        {signature && (
          <div className="border-t border-[#d8d6ce] bg-[#f8f7f4] px-6 py-3 sm:px-8">
            <div className="flex items-start gap-2.5 text-[12px]">
              <span className="mt-0.5 shrink-0 font-bold text-[#059669]">
                *.sig
              </span>
              <span className="text-[#60636a] break-all text-[11px] leading-relaxed">
                {signature.substring(0, 96)}...
              </span>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-[12px] text-[#60636a] pl-1">
        Sağ tık &rarr; Özellikler &rarr; Dijital İmzalar&apos;dan
        doğrulayabilirsin.
      </p>
    </section>
  );
}

function VersionHistory({
  versions,
}: {
  versions: ReturnType<typeof getVersionHistory>;
}) {
  if (versions.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#60636a]">
        Sürüm geçmişi
      </p>

      <div className="panel overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center border-b border-[#d8d6ce] bg-[#f8f7f4] px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#60636a]">
          <div>Sürüm</div>
          <div className="text-right">Boyut</div>
          <div className="text-right">Dosya</div>
        </div>

        {versions.map((entry) => (
          <div
            key={entry.version}
            className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-6 py-3 border-b border-[#ecebe6] last:border-b-0 hover:bg-[#f8f7f4] transition-colors"
          >
            <div>
              <span className="text-[14px] font-bold text-[#111113]">
                v{entry.version}
              </span>
            </div>
            <div className="text-right text-[13px] tabular-nums text-[#60636a]">
              {formatBytes(entry.size)}
            </div>
            <div className="flex items-center gap-3 text-right">
              <a
                href={entry.url}
                className="text-[13px] font-bold text-[#059669] hover:text-[#047857] transition-colors"
              >
                .exe
              </a>
              {entry.signature ? (
                <a
                  href={entry.signature}
                  className="text-[12px] text-[#60636a] hover:text-[#111113] transition-colors"
                >
                  .sig
                </a>
              ) : (
                <span className="text-[12px] text-[#ccc]">&mdash;</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#d8d6ce]">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center text-[13px] text-[#60636a]">
        Ceneyra Inner &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

/* ============================================
   Ana sayfa
   ============================================ */

export default function Home() {
  const latestRelease = getLatestRelease();
  const versions = getVersionHistory();

  if (!latestRelease) {
    return (
      <main className="flex-1 flex items-center justify-center px-6 min-h-screen">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d8d6ce] bg-white/80 px-4 py-2 backdrop-blur-sm">
            <span className="text-[13px] font-semibold text-[#60636a]">
              Güncelleme bilgisi okunamadı
            </span>
          </div>
          <p className="text-[#60636a] text-sm">
            Biraz sonra tekrar dene.
          </p>
        </div>
      </main>
    );
  }

  const platform = latestRelease.platforms["windows-x86_64"];
  const currentEntry = versions.find(
    (v) => v.version === latestRelease.version
  );

  return (
    <main className="flex-1">
      <Hero
        version={latestRelease.version}
        date={latestRelease.pub_date}
      />
      <DownloadCard
        version={latestRelease.version}
        size={currentEntry?.size ?? 0}
        url={platform?.url ?? "#"}
        signature={platform?.signature ?? ""}
      />
      <VersionHistory versions={versions} />
      <Footer />
    </main>
  );
}
