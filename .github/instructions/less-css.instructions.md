---
description: "Use when writing, editing, or reviewing Less or CSS (.less, .css, .scss) files. Enforces naming conventions, variable usage, specificity rules, and stylesheet organization."
applyTo: "**/*.{less,css,scss}"
---

# Less / CSS Coding Standards

## 1. Variables & Design Tokens

- Define all colors, spacing, font sizes, and breakpoints as variables at the top of the root file — never hardcode raw values inline.
- In Less: use `@variable-name`; in SCSS: use `$variable-name`; in plain CSS: use `--custom-property`.
- Group variables by category with a comment header.

```less
// Colors
@color-primary: #0070f3;
@color-foreground: #171717;
@color-background: #ffffff;

// Spacing
@spacing-sm: 8px;
@spacing-md: 16px;
@spacing-lg: 24px;

// Breakpoints
@breakpoint-md: 768px;
@breakpoint-lg: 1280px;
```

## 2. Naming — BEM

- Use BEM (Block\_\_Element--Modifier) for all class names.
- Block: the standalone component (`.card`, `.navbar`, `.form`).
- Element: a part of the block, separated by `__` (`.card__title`, `.form__input`).
- Modifier: a variant or state, separated by `--` (`.card--featured`, `.form__input--error`).
- No camelCase or PascalCase in class names.

```less
.card {
  &__title {
    font-size: 1.25rem;
  }
  &__body {
    padding: @spacing-md;
  }
  &--featured {
    border: 2px solid @color-primary;
  }
}
```

## 3. Nesting (Less / SCSS)

- Limit nesting to 3 levels maximum — deeper nesting signals a component that should be split.
- Use `&` for pseudo-classes, pseudo-elements, and modifiers only.
- Never nest a full selector chain just to scope styles — that inflates specificity unnecessarily.

```less
// Good — max 2 levels
.navbar {
  background: @color-background;
  &__link {
    color: @color-foreground;
    &:hover {
      color: @color-primary;
    }
  }
}

// Bad — 4 levels deep
.navbar .nav-wrapper .nav-list .nav-item {
  ...;
}
```

## 4. Specificity

- Avoid `!important` — if needed, it signals a specificity problem to fix at the source.
- Never use ID selectors (`#id`) for styling — IDs have too high specificity.
- Prefer class selectors over element selectors for reusable styles.
- Keep specificity as flat as possible; lean on BEM modifiers over chaining selectors.

## 5. Responsive Design

- Use mixins or media query variables for breakpoints — never hardcode pixel values inline.
- Mobile-first: write base styles for small screens, then override at larger breakpoints.

```less
.card {
  padding: @spacing-sm;

  @media (min-width: @breakpoint-md) {
    padding: @spacing-md;
  }
}
```

## 6. File Organization

Organize stylesheets in this order within a project:

1. **Variables / tokens** — `variables.less`
2. **Mixins / functions** — `mixins.less`
3. **Reset / base** — `base.less`
4. **Layout** — `layout.less`
5. **Components** — one file per component: `card.less`, `navbar.less`
6. **Utilities** — `utilities.less`
7. **Overrides / themes** — last, to win specificity battles intentionally

Import order in the entry file must follow the above sequence.

## 7. Mixins

- Define mixins for repeated patterns (e.g., clearfix, flex-center, truncate).
- Parameterize mixins with defaults; document parameters with a comment.
- Avoid mixins that simply duplicate a one-liner utility — write the utility class instead.

```less
// Centers content using flexbox.
// @align-items: cross-axis alignment (default: center)
.mixin-flex-center(@align-items: center) {
  display: flex;
  justify-content: center;
  align-items: @align-items;
}
```

## 8. Comments

- Use section comments (`// ─── Section Name ───`) to divide a file into logical regions.
- Comment non-obvious rules with a brief rationale.
- Remove commented-out code before committing.
