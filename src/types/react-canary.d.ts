// React's <ViewTransition> ships in the React build Next bundles, but the
// stable @types/react only declares it in canary.d.ts. Pulling that module in
// once applies its `declare module "react"` augmentation across the project.
import {} from "react/canary"
