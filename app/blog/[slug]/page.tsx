/**
 * @file page.tsx
 * @description Individual blog post page. Reads the markdown file for the given slug,
 * renders it to HTML, and displays it with styled prose typography.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllSlugs } from "@/lib/blog";

interface BlogPostPageProps {
  /** Route params object; `slug` matches the markdown filename without `.md`. */
  readonly params: Promise<{ slug: string }>;
}

/**
 * @description Generates Next.js static params for all blog post slugs, enabling SSG.
 * @returns Array of `{ slug }` objects for every markdown file in `docs/blogs/`.
 */
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllSlugs().map((slug) => ({ slug }));
}

/**
 * @description Generates `<title>` and description metadata for the post page.
 * @param props - Route props containing the async params.
 * @returns Next.js `Metadata` object for this route.
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

/**
 * @description Blog post detail page. Renders the full markdown as styled HTML.
 * Calls `notFound()` if no matching file exists for the slug.
 * @param props - {@link BlogPostPageProps}
 * @returns Full article layout with breadcrumb, header, content, and back link.
 */
export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      {/* Breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb"
        className="animate-fade-in-up mb-10 flex items-center gap-2 font-mono text-xs text-(--text-muted)"
      >
        <Link href="/" className="transition-colors hover:text-accent">
          ~
        </Link>
        <span>/</span>
        <Link href="/blog" className="transition-colors hover:text-accent">
          blog
        </Link>
        <span>/</span>
        <span className="max-w-xs truncate text-(--text-secondary)">
          {post.slug}
        </span>
      </nav>

      {/* Post header */}
      <header
        className="animate-fade-in-up mb-12"
        style={{ animationDelay: "0.1s" }}
      >
        {post.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="rounded border border-(--border-color) bg-(--accent-dim) px-2 py-0.5 font-mono text-xs text-accent"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-mono text-3xl font-bold leading-tight text-foreground md:text-5xl">
          {post.title}
        </h1>

        <time
          className="mt-4 block font-mono text-sm text-(--text-muted)"
          dateTime={post.date.toISOString()}
        >
          {post.dateFormatted}
        </time>

        <div className="mt-8 h-px bg-(--border-color)" aria-hidden="true" />
      </header>

      {/* Rendered markdown content */}
      <article
        className="prose-content animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
        // Safe: HTML is generated server-side from trusted local markdown files only.
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Back to blog link */}
      <div
        className="animate-fade-in-up mt-16 border-t border-(--border-color) pt-8"
        style={{ animationDelay: "0.3s" }}
      >
        <Link
          href="/blog"
          className="font-mono text-sm text-(--text-secondary) transition-colors hover:text-accent"
        >
          ← back to blog
        </Link>
      </div>
    </div>
  );
}
