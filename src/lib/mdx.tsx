import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseImage } from "@/components/CaseImage";

const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-12 mb-4 text-2xl font-extrabold tracking-tight text-[var(--ink)] text-balance"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 mb-3 text-xl font-extrabold tracking-tight text-[var(--ink)] text-balance"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="max-w-[65ch] text-lg leading-relaxed text-[var(--ink)] text-pretty"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="mb-6 max-w-[65ch] list-disc space-y-2 pl-5 text-lg leading-relaxed text-[var(--ink)]"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="pl-1" {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-10 border-l-2 border-[var(--accent)] pl-6 text-xl font-medium leading-snug text-[var(--accent)] text-pretty"
      {...props}
    />
  ),
  em: (props: React.ComponentProps<"em">) => (
    <em className="not-italic text-[var(--muted)]" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="underline decoration-[var(--accent)] underline-offset-4 transition-opacity hover:opacity-70"
      {...props}
    />
  ),
  img: (props: React.ComponentProps<"img">) => (
    <CaseImage
      path={typeof props.src === "string" ? props.src : undefined}
      label={typeof props.alt === "string" ? props.alt : ""}
    />
  ),
  CaseImage,
  figure: (props: React.ComponentProps<"figure">) => (
    <figure className="my-10 [&>img]:my-0 [&_span]:my-0" {...props} />
  ),
  figcaption: (props: React.ComponentProps<"figcaption">) => (
    <figcaption
      className="mt-3 text-sm leading-relaxed text-[var(--muted)] text-pretty"
      {...props}
    />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-body">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
