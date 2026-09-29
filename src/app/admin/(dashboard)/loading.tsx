export default function AdminLoading() {
  return (
    <div role="status" className="flex flex-col gap-lg">
      <span className="sr-only">Loading…</span>

      <div className="flex flex-col gap-xs">
        <div className="h-10 w-56 max-w-full animate-pulse rounded-control bg-surface-container" />
        <div className="h-5 w-72 max-w-full animate-pulse rounded-control bg-surface-container-low" />
      </div>

      <div className="flex flex-col gap-sm rounded-container border border-border bg-card p-md">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-14 animate-pulse rounded-control bg-surface-container-low"
          />
        ))}
      </div>
    </div>
  )
}
