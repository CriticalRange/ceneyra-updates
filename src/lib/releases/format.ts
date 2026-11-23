const releaseDateFormat = new Intl.DateTimeFormat("tr-TR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Europe/Istanbul",
});

export function formatReleaseDate(date: Date): string {
  return releaseDateFormat.format(date);
}

export function formatInstallerSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
