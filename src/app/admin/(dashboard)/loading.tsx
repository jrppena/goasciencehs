export default function AdminLoading() {
  return (
    <div role="status" className="flex flex-col gap-lg">
      <span className="sr-only">Loading…</span>

      <div className="flex flex-col gap-xs">
        <div className="h-10 w-56 max-w-full animate-pulse rounded-control bg-surface-container" />
        <div className="h-5 w-72 max-w-full animate-pulse rounded-control bg-surface-container" />
      </div>

      {/* One neutral block: the routes it covers are half lists, half forms. */}
      <div className="h-72 w-full animate-pulse rounded-container border border-border bg-card" />
    </div>
  )
}
