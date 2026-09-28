# Database models

One file per collection: `news.ts`, `faculty.ts`, `site-settings.ts`, `school-stats.ts`, `user.ts`. Each follows the same convention, and every later content ticket copies it.

## Each model file

1. `import "server-only"` at the top. A model must never reach the client bundle.
2. Define the `Schema`. Schemas are the single source of truth for shape, enums, and required fields — comments belong here.
3. Derive the TypeScript type with `InferSchemaType<typeof schema>`; never hand-write a type that mirrors a schema.
4. Register the model through the HMR guard:

   ```ts
   export const NewsModel: Model<NewsPost> =
     (models.News as Model<NewsPost> | undefined) ??
     model<NewsPost>("News", newsSchema)
   ```

   Without it, `next dev` reloads re-register the model and throw `OverwriteModelError`.

## Optional fields and defaults

Inferred types follow Mongoose: a path is required when it has `required: true` or a `default`, and optional otherwise. Arrays default to `[]` unless declared `default: undefined` — do that when "not supplied" must stay distinguishable from an empty list.

## Updates

Writes must pass `{ runValidators: true }`; Mongoose skips schema validation on `updateOne`/`updateMany`/`findOneAndUpdate` otherwise.

```ts
await NewsModel.updateOne({ slug }, data, { runValidators: true })
```

## Existing content in `src/lib`

`news.ts`, `faculty.ts`, `site.ts`, and `school-stats.ts` still hold the seed data, but their types are re-exported from these models, so the data is checked against the schemas until the seed ticket replaces it.

## Tests

`<model>.test.ts` beside the model. `vitest.config.mts` maps `@/*` and stubs `server-only` (`test/server-only-stub.ts`), so validation can run without a database. Run with `npm test`.
