"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type ListSelection = {
  selected: ReadonlySet<string>
  toggle: (id: string, checked: boolean) => void
  setMany: (ids: string[], checked: boolean) => void
  clear: () => void
}

const ListSelectionContext = createContext<ListSelection | null>(null)

/**
 * Tracks which rows of an admin list are selected. The row checkboxes and the
 * bulk toolbar are separate client islands over server-rendered rows, so they
 * share state through this context. Remount (keyed on the active filters) to
 * start a fresh selection.
 */
function ListSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set())

  const toggle = useCallback((id: string, checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])

  const setMany = useCallback((ids: string[], checked: boolean) => {
    setSelected((current) => {
      const next = new Set(current)
      for (const id of ids) {
        if (checked) next.add(id)
        else next.delete(id)
      }
      return next
    })
  }, [])

  const clear = useCallback(() => setSelected(new Set()), [])

  const value = useMemo(
    () => ({ selected, toggle, setMany, clear }),
    [selected, toggle, setMany, clear]
  )

  return (
    <ListSelectionContext.Provider value={value}>
      {children}
    </ListSelectionContext.Provider>
  )
}

function useListSelection() {
  const context = useContext(ListSelectionContext)
  if (!context) {
    throw new Error("useListSelection must be used inside ListSelectionProvider")
  }
  return context
}

/** Row checkbox that registers its record with the list's selection. */
function RowSelectCheckbox({ id, label }: { id: string; label: string }) {
  const { selected, toggle } = useListSelection()

  return (
    <input
      type="checkbox"
      checked={selected.has(id)}
      onChange={(event) => toggle(id, event.target.checked)}
      aria-label={label}
      className="size-4 shrink-0 accent-primary"
    />
  )
}

export { ListSelectionProvider, RowSelectCheckbox, useListSelection }
