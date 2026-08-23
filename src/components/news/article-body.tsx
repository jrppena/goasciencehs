import type { NewsPost } from "@/lib/news"
import { MediaPlaceholder } from "@/components/ui/media-placeholder"

/** The bulletin itself: one cover shot, then the paragraphs. */
function ArticleBody({ post }: { post: NewsPost }) {
  return (
    <article className="page-gutter mx-auto flex max-w-4xl flex-col gap-md py-xl">
      <MediaPlaceholder
        label={`Photo for ${post.title}`}
        className="aspect-[16/9] w-full"
      />
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
