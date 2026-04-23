---
description: "Use when writing, editing, or reviewing Vue 3 (.vue, .ts) files. Enforces Composition API, script setup, TypeScript, and Vue-specific best practices. Complements general-frontend.instructions.md."
---

# Vue 3 Coding Standards

## 1. Composition API & Script Setup

- Always use `<script setup lang="ts">` — never Options API or `defineComponent` wrappers.
- Declare props with `defineProps<{...}>()` and emits with `defineEmits<{...}>()` using TypeScript generics.
- Use `withDefaults(defineProps<...>(), {...})` for default prop values.

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}
const props = withDefaults(defineProps<Props>(), { count: 0 });
const emit = defineEmits<{ change: [value: number] }>();
</script>
```

## 2. Reactivity

- Prefer `ref()` for primitives, `reactive()` for plain objects that are always used together.
- Always access `ref` values via `.value` in `<script>`; Vue unwraps them automatically in `<template>`.
- Use `computed()` for derived state — never recompute in the template.
- Use `watch()` with explicit sources; avoid `watchEffect()` unless the dependency list is genuinely dynamic.

```ts
const count = ref<number>(0);
const doubled = computed(() => count.value * 2);
```

## 3. Component File Structure

Order within a `.vue` file:

1. `<script setup lang="ts">` — imports, props, emits, composables, state, computed, watchers, handlers
2. `<template>` — single root element preferred; use fragments only when necessary
3. `<style scoped>` — scoped styles only; no global style blocks unless in a layout file

## 4. Template Conventions

- Use `v-bind` shorthand (`:`), `v-on` shorthand (`@`), and `v-slot` shorthand (`#`).
- Never use `v-html` with user-supplied content (XSS risk).
- Use `v-for` with `:key` bound to a stable unique ID — never use array index as key.
- Prefer `v-show` for frequent toggles, `v-if` for conditional rendering of expensive subtrees.

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

## 5. Composables

- Extract reusable logic into composables (`use*.ts`) in a `composables/` directory.
- Composables must return a plain object of refs and functions — never a reactive wrapper.
- Name composables with the `use` prefix: `useAuth`, `usePagination`.
- Every composable file must have a JSDoc `@file` + `@description` header (see general-frontend rules).

## 6. Routing (Vue Router)

- Define routes in a dedicated `router/index.ts` with typed route names.
- Use `<RouterLink>` for navigation — never bare `<a>` tags with local paths.
- Use `useRoute()` and `useRouter()` composables in components — never access `$route` / `$router` directly in `<script setup>`.

## 7. State Management (Pinia)

- Define stores with `defineStore('id', () => { ... })` (Setup Store syntax).
- Keep stores focused: one store per domain slice.
- Never mutate store state directly from outside the store — expose action functions.

## 8. Styles

- Use `<style scoped>` for component styles.
- Prefer Tailwind utilities if the project uses Tailwind; otherwise use BEM naming.
- Use CSS custom properties (`var(--color-primary)`) for design tokens — no hardcoded hex values.
