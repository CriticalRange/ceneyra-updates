import {
  getLatestRelease,
  getVersionHistory,
  formatBytes,
  formatDate,
} from "@/lib/releases";

function Footer() {
  return (
    <footer className="border-t-[2px] border-[#1a1a1a] bg-[#faf5ed]">
      <div className="mx-auto max-w-4xl px-5 py-8 text-center text-[13px] text-[#6b6b6b]">
        Ceneyra Inner &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

function Hero({ version, date }: { version: string; date: string }) {
  return (
    <section className="relative overflow-hidden border-b-[2px] border-[#1a1a1a]">
      {/* Dot pattern bg */}
      <div className="absolute inset-0 stars pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-5 pt-4 pb-20 sm:pb-28">
        {/* Version badge */}
        <div className="stagger-1 mb-8 inline-flex items-center gap-2 border-[2px] border-[#1a1a1a] bg-[#ffd166] px-4 py-1.5 shadow-hard-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-[#16a34a]" />
          <span className="text-[13px] font-bold text-[#5c3d00] font-mono tracking-tight">
            v{version} &mdash; {formatDate(date)}
          </span>
        </div>

        {/* Big heading */}
        <h1 className="stagger-2 mb-6 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight">
          Ceneyra Inner{" "}
          <span className="text-[#16a34a]">İndirmeleri</span>
        </h1>

        <p className="stagger-3 mb-10 max-w-lg text-[17px] leading-relaxed text-[#6b6b6b]">
          Aşağıda Ceneyra Inner için indirmeleri bulabilirsiniz.
        </p>

        {/* Jump link */}
        <a
          href="#indir"
          className="stagger-4 inline-flex items-center gap-2 text-[14px] font-bold text-[#16a34a] hover:text-[#15803d] transition-colors group"
        >
          <span>Aşağıya bak</span>
          <svg
            className="h-4 w-4 group-hover:translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
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
    <section id="indir" className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
      {/* Section label */}
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">
        En güncel sürüm
      </p>

      {/* Main card */}
      <div className="border-[2px] border-[#1a1a1a] bg-white transition-all -rotate-[0.3deg]">
        {/* Card interior */}
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          {/* Left: platform info */}
          <div className="flex items-start gap-4">
            {/* Windows logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border-[2px] border-[#1a1a1a] bg-[#faf5ed] shadow-hard-sm">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 12V6.5l8-1.09V12H3zm0 .73V18l8-1.09V12.73H3zm9-5.86L21 5.5v6.23h-9V6.87zm0 .73V12h9v6.23l-9 1.37V7.6z" />
              </svg>
            </div>
            <div>
              <div className="text-[16px] font-bold">Windows x64</div>
              <div className="text-[13px] text-[#6b6b6b] mt-0.5">
                Windows 10/11 &bull;{" "}
                {size > 0 ? formatBytes(size) : "~5 MB"}
              </div>
              <div className="text-[12px] text-[#6b6b6b] mt-0.5 font-mono">
                v{version}
              </div>
            </div>
          </div>

          {/* Right: download button */}
          <a
            href={url}
            className="thud flex items-center justify-center gap-2 border-[2px] border-[#1a1a1a] bg-[#16a34a] px-8 py-3.5 text-[15px] font-bold text-white shadow-hard hover:shadow-hard-hover hover:bg-[#15803d] transition-all shrink-0 select-none"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            .exe&apos;yi indir
          </a>
        </div>

        {/* Signature row */}
        {signature && (
          <div className="border-t-[2px] border-[#1a1a1a] bg-[#faf5ed] px-6 py-3 sm:px-8">
            <div className="flex items-start gap-2.5 text-[12px]">
              <span className="mt-0.5 shrink-0 font-mono font-bold text-[#16a34a]">
                *.sig
              </span>
              <span className="text-[#6b6b6b] break-all font-mono text-[11px] leading-relaxed">
                {signature.substring(0, 96)}...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Small note under card */}
      <p className="mt-4 text-[12px] text-[#6b6b6b] pl-1">
        İndirdikten sonra sağ tık &rarr; Özellikler &rarr; Dijital
        İmzalar&apos;dan imzayı doğrulayabilirsin.
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
    <section id="gecmis" className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b6b6b]">
        Sürüm geçmişi
      </p>

      {/* Squiggly divider */}
      <div className="squiggle mb-8" />

      <div className="border-[2px] border-[#1a1a1a] bg-white">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center border-b-[2px] border-[#1a1a1a] bg-[#faf5ed] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b6b6b]">
          <div>Sürüm</div>
          <div className="text-right">Boyut</div>
          <div className="text-right">Dosya</div>
        </div>

        {versions.map((entry, i) => (
          <div
            key={entry.version}
            className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-5 py-3 border-b-[1px] border-[#e5e0d8] last:border-b-0 hover:bg-[#faf5ed] transition-colors"
          >
            {/* Version + optional date */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[14px] font-bold font-mono">
                v{entry.version}
              </span>
            </div>
            {/* Size */}
            <div className="text-right text-[13px] tabular-nums text-[#6b6b6b]">
              {formatBytes(entry.size)}
            </div>
            {/* Links */}
            <div className="flex items-center gap-3 text-right">
              <a
                href={entry.url}
                className="text-[13px] font-bold text-[#16a34a] hover:text-[#15803d] transition-colors"
              >
                .exe
              </a>
              {entry.signature ? (
                <a
                  href={entry.signature}
                  className="text-[12px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors font-mono"
                >
                  .sig
                </a>
              ) : (
                <span className="text-[12px] text-[#ccc] font-mono">
                  &mdash;
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const latestRelease = getLatestRelease();
  const versions = getVersionHistory();

  if (!latestRelease) {
    return (
      <>
        <main className="flex-1 flex items-center justify-center px-5">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 border-[2px] border-[#1a1a1a] bg-[#ffd166] px-4 py-2 shadow-hard-sm">
              <span className="text-[13px] font-bold text-[#5c3d00]">
                bi&apos; şeyler ters gitti
              </span>
            </div>
            <p className="text-[#6b6b6b]">
              Güncelleme bilgisi okunamadı. Biraz sonra tekrar dene.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const platform = latestRelease.platforms["windows-x86_64"];
  const currentEntry = versions.find(
    (v) => v.version === latestRelease.version
  );

  return (
    <>
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
      </main>
      <Footer />
    </>
  );
}
