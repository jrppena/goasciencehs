import Link from "next/link"

/** 404 inside the admin shell, for links to deleted posts and the like. */
export default function AdminNotFound() {
  return (
    <div className="flex flex-col gap-sm">
      <h1 className="font-display text-headline-lg uppercase text-primary">
        Not found
      </h1>
      <p className="text-body-md text-muted-foreground">
        That record does not exist, or it was deleted.
      </p>
      <Link
        href="/admin"
        className="w-fit font-display text-button uppercase text-primary hover:underline"
      >
        Back to dashboard
      </Link>
    </div>
  )
}
