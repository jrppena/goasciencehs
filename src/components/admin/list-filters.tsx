"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent } from "react"

import { Select } from "@/components/admin/form-field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ListFilterSelect = {
  name: string
  label: string
  /** Current value, already narrowed by the page's parser. */
  value: string
  allLabel: string
  options: ReadonlyArray<{ value: string; label: string }>
}

/**
 * Search + filter form shared by the admin lists. Renders a real GET form so
 * filtering still works without JavaScript; when JavaScript is available the
 * submit is upgraded to a client-side navigation that keeps the filters in the
 * URL. Remount (keyed on the active filters) to resync the controls.
 */
function ListFilters({
  basePath,
  query,
  hasFilters,
  searchPlaceholder,
  select,
}: {
  basePath: string
  query: string
  hasFilters: boolean
  searchPlaceholder: string
  /** The list's secondary dropdown filter, when it has one. */
  select?: ListFilterSelect
}) {
  const router = useRouter()

  function applyFilters(form: HTMLFormElement) {
    const params = new URLSearchParams()
    for (const [key, value] of new FormData(form).entries()) {
      const text = String(value).trim()
      if (text) params.set(key, text)
    }
    const search = params.toString()
    router.push(search ? `${basePath}?${search}` : basePath)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    applyFilters(event.currentTarget)
  }

  return (
    <form
      method="get"
      action={basePath}
      onSubmit={handleSubmit}
      role="search"
      className="flex flex-wrap items-end gap-sm"
    >
      <div className="flex min-w-52 flex-1 flex-col gap-xs">
        <Label htmlFor="list-search">Search</Label>
        <Input
          id="list-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder={searchPlaceholder}
        />
      </div>

      {select ? (
        <div className="flex flex-col gap-xs sm:w-56">
          <Label htmlFor="list-filter-select">{select.label}</Label>
          <Select
            id="list-filter-select"
            name={select.name}
            defaultValue={select.value}
            onChange={(event) => {
              const form = event.currentTarget.form
              if (form) applyFilters(form)
            }}
          >
            <option value="">{select.allLabel}</option>
            {select.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      ) : null}

      <div className="flex items-center gap-sm">
        <Button type="submit" variant="outline">
          Search
        </Button>
        {hasFilters ? (
          <Button
            type="button"
            variant="ghost"
            render={<Link href={basePath} />}
          >
            Clear
          </Button>
        ) : null}
      </div>
    </form>
  )
}

export { ListFilters }
export type { ListFilterSelect }
