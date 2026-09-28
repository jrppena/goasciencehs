import type { VariantProps } from "class-variance-authority"
import { MegaphoneIcon } from "lucide-react"

import type { NewsCategory } from "@/lib/news"
import { Badge, type badgeVariants } from "@/components/ui/badge"

/** A news category badge. Advisory gets a distinct treatment so an official
 * notice reads as one at a glance, wherever the category is shown. */
function CategoryBadge({
  category,
  variant,
}: {
  category: NewsCategory
  variant?: VariantProps<typeof badgeVariants>["variant"]
}) {
  if (category === "Advisory") {
    return (
      <Badge className="bg-secondary-fixed text-on-secondary-fixed">
        <MegaphoneIcon aria-hidden="true" />
        {category}
      </Badge>
    )
  }

  return <Badge variant={variant}>{category}</Badge>
}

export { CategoryBadge }
