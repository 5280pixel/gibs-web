import { site } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--rule)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm font-medium text-[var(--ink)]">
          {site.name}
          <span className="mt-1 block font-normal text-[var(--muted)] sm:mt-0 sm:ml-2 sm:inline">
            Clarity, trust, and practical creative leadership.
          </span>
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-[var(--accent)]"
          >
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--accent)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
