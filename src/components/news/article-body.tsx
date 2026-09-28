import type { NewsPost } from "@/lib/news"

/** The bulletin itself: just the paragraphs — the header owns the cover shot. */
function ArticleBody({ post }: { post: NewsPost }) {
  return (
    <article className="page-gutter mx-auto max-w-4xl py-xl">
      <div className="mx-auto flex max-w-3xl flex-col gap-md">
        {post.body.map((paragraph) => (
          <p key={paragraph} className="text-body-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}

export { ArticleBody }
