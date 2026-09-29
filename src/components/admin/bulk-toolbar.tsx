"use client"

import { useEffect, useRef, useState, useTransition } from "react"

import { ConfirmActionButton } from "@/components/admin/confirm-action-button"
import { useListSelection } from "@/components/admin/list-selection"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ListItemNoun = { singular: string; plural: string }

type BulkAction =
  | {
      kind: "direct"
      label: string
      /** Past-tense verb used in the completion message, e.g. "published". */
      doneVerb: string
      run: (ids: string[]) => Promise<void>
    }
  | {
      kind: "confirmed"
      label: string
      doneVerb: string
      run: (formData: FormData) => Promise<void>
    }

/**
 * Selection toolbar shared by the admin lists: select-all, a live selection
 * count, that list's bulk actions, and a two-step confirm for the destructive
 * one. Pins to the top of the viewport while a selection exists so the actions
 * stay reachable on long lists.
 */
function BulkToolbar({
  itemNoun,
  visibleIds,
  actions,
}: {
  itemNoun: ListItemNoun
  /** Ids of the rows currently rendered, in order. */
  visibleIds: string[]
  actions: BulkAction[]
}) {
  const { selected, setMany, clear } = useListSelection()
  const [isPending, startTransition] = useTransition()
  const [running, setRunning] = useState<string | null>(null)
  const [status, setStatus] = useState<{
    text: string
    error?: boolean
  } | null>(null)
  const selectAllRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  const selectedIds = visibleIds.filter((id) => selected.has(id))
  const count = selectedIds.length
  const allSelected = visibleIds.length > 0 && count === visibleIds.length
  const hasSelection = count > 0
  const noun = count === 1 ? itemNoun.singular : itemNoun.plural

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = count > 0 && !allSelected
    }
  }, [count, allSelected])

  /**
   * The triggered buttons unmount once the selection clears, so completion
   * focuses the status line instead of dropping focus to the body.
   */
  function finishAction(text: string, error = false) {
    setStatus({ text, error })
    statusRef.current?.focus()
  }

  function runDirect(action: Extract<BulkAction, { kind: "direct" }>) {
    const ids = [...selectedIds]
    setRunning(action.label)
    startTransition(async () => {
      try {
        await action.run(ids)
        clear()
        finishAction(
          `${ids.length} ${
            ids.length === 1 ? itemNoun.singular : itemNoun.plural
          } ${action.doneVerb}.`
        )
      } catch {
        finishAction("That action could not be completed. Please try again.", true)
      } finally {
        setRunning(null)
      }
    })
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-md gap-y-sm rounded-container border border-border bg-card px-md py-sm transition-colors",
        hasSelection && "sticky top-0 z-10 border-primary"
      )}
    >
      <label className="flex items-center gap-xs text-body-md">
        <input
          ref={selectAllRef}
          type="checkbox"
          checked={allSelected}
          onChange={(event) => setMany(visibleIds, event.target.checked)}
          className="size-4 accent-primary"
        />
        Select all {visibleIds.length}{" "}
        {visibleIds.length === 1 ? itemNoun.singular : itemNoun.plural}
      </label>

      <p
        ref={statusRef}
        role="status"
        tabIndex={-1}
        className={cn(
          "font-mono text-label-md uppercase outline-none",
          status?.error ? "text-error" : "text-muted-foreground"
        )}
      >
        {hasSelection ? `${count} selected` : (status?.text ?? "")}
      </p>

      <div className="ml-auto flex flex-wrap items-center gap-xs">
        {hasSelection ? (
          <>
            {actions.map((action) =>
              action.kind === "confirmed" ? (
                <ConfirmActionButton
                  key={action.label}
                  action={async (formData) => {
                    try {
                      await action.run(formData)
                      clear()
                      finishAction(`${count} ${noun} ${action.doneVerb}.`)
                    } catch {
                      finishAction(
                        "That action could not be completed. Please try again.",
                        true
                      )
                    }
                  }}
                  hiddenFields={selectedIds.map((id) => ({
                    name: "ids",
                    value: id,
                  }))}
                  label={action.label}
                  confirmLabel={`${action.label} ${count} ${noun}? This cannot be undone.`}
                  triggerVariant="outline"
                  submitVariant="destructive"
                />
              ) : (
                <Button
                  key={action.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => runDirect(action)}
                >
                  {isPending && running === action.label
                    ? "Saving…"
                    : action.label}
                </Button>
              )
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                clear()
                statusRef.current?.focus()
              }}
            >
              Clear selection
            </Button>
          </>
        ) : null}
      </div>
    </div>
  )
}

export { BulkToolbar }
export type { BulkAction, ListItemNoun }
