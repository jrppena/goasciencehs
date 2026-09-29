/**
 * Publishing travels on the submit button (`intent`), not a pre-checked box,
 * so a stray Enter or a forgotten setting can never put a half-written notice
 * on the official site. `published` mirrors what is already stored, so an
 * ordinary save keeps a live post live.
 */
export function resolveIsPublished(formData: FormData): boolean {
  const intent = formData.get("intent")

  if (intent === "publish") return true
  if (intent === "unpublish") return false

  return formData.get("published") === "on"
}
