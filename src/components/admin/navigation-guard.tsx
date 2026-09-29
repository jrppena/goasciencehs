"use client"

import Link from "next/link"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"

type NavigationGuard = {
  isBlocked: boolean
  setIsBlocked: (blocked: boolean) => void
}

const NavigationGuardContext = createContext<NavigationGuard | null>(null)

const LEAVE_MESSAGE =
  "You have unsaved changes. Leave this page and discard them?"

/**
 * Lets an editing form tell the admin shell that in-app navigation would
 * discard unsaved work. Forms outside the provider (public pages) are
 * unaffected.
 */
function NavigationGuardProvider({ children }: { children: ReactNode }) {
  const [isBlocked, setIsBlockedState] = useState(false)
  const setIsBlocked = useCallback(
    (blocked: boolean) => setIsBlockedState(blocked),
    []
  )
  const value = useMemo(
    () => ({ isBlocked, setIsBlocked }),
    [isBlocked, setIsBlocked]
  )

  return (
    <NavigationGuardContext.Provider value={value}>
      {children}
    </NavigationGuardContext.Provider>
  )
}

/** Null outside the admin shell, where there is nothing to guard. */
function useNavigationGuard() {
  return useContext(NavigationGuardContext)
}

/**
 * A Link that asks before discarding unsaved changes. `onNavigate` only fires
 * for same-tab client-side navigation, so new-tab links stay untouched.
 */
function GuardedLink({ onNavigate, ...props }: ComponentProps<typeof Link>) {
  const guard = useNavigationGuard()

  return (
    <Link
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event)
        if (guard?.isBlocked && !window.confirm(LEAVE_MESSAGE)) {
          event.preventDefault()
        }
      }}
    />
  )
}

/**
 * Shared unsaved-work guard for admin editors: marks in-app navigation as
 * blocked while the form is dirty and warns before a reload or tab close.
 */
function useUnsavedChanges(dirty: boolean) {
  const guard = useNavigationGuard()
  const setIsBlocked = guard?.setIsBlocked

  useEffect(() => {
    if (!setIsBlocked) return

    setIsBlocked(dirty)
    return () => setIsBlocked(false)
  }, [dirty, setIsBlocked])

  useEffect(() => {
    if (!dirty) return

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [dirty])
}

export {
  GuardedLink,
  NavigationGuardProvider,
  useNavigationGuard,
  useUnsavedChanges,
}
