import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: StaticRoutePlaceholder,
});

function StaticRoutePlaceholder() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-6 rounded-[2rem] border border-border bg-card p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Static homepage</p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          This route is now only a fallback.
        </h1>
        <p className="max-w-2xl text-muted-foreground leading-7">
          The real homepage is served from the root <code>index.html</code> file for GitHub Pages.
          This route remains so the TanStack build stays valid during local development.
        </p>
        <a
          href="/index.html"
          className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Open static homepage
        </a>
      </div>
    </main>
  );
}
