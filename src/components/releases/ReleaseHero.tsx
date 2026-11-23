import { formatReleaseDate } from "@/lib/releases/format";
import type { LatestRelease } from "@/lib/releases/manifest";

export function ReleaseHero({ release }: { release: LatestRelease | null }) {
  return (
    <header className="overflow-hidden border-b border-line">
      <div className="content-width pt-6 pb-16 sm:pb-20">
        {release && (
          <div className="enter-1 mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-1.5 backdrop-blur-sm">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            <span className="text-[13px] font-semibold text-muted">
              v{release.version}
              {release.publishedAt && (
                <>
                  {" — "}
                  <time dateTime={release.publishedAt.toISOString()}>
                    {formatReleaseDate(release.publishedAt)}
                  </time>
                </>
              )}
            </span>
          </div>
        )}
        <h1 className="enter-2 mb-4 text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
          Ceneyra Inner <span className="text-accent">İndirmeleri</span>
        </h1>
        <p className="enter-3 text-base leading-relaxed text-muted">
          Aşağıda Ceneyra Inner için indirmeleri bulabilirsiniz.
        </p>
      </div>
    </header>
  );
}
