---
description: "Use when writing, editing, or reviewing React Native (.tsx, .ts) files. Enforces RN-specific component patterns, styling, navigation, and platform conventions. Complements general-frontend.instructions.md."
---

# React Native Coding Standards

## 1. Core Primitives

- Use RN core primitives (`View`, `Text`, `Pressable`, `ScrollView`, `FlatList`, etc.) — never use HTML elements (`div`, `p`, `button`).
- All visible text must be wrapped in `<Text>` — never render raw strings inside `<View>`.
- Use `<Pressable>` over `<TouchableOpacity>` or `<TouchableHighlight>` for new code.

```tsx
// Good
<Pressable onPress={handlePress}>
  <Text>Tap me</Text>
</Pressable>

// Bad
<div onClick={handlePress}>Tap me</div>
```

## 2. Styling

- Use `StyleSheet.create({})` for all styles — never use inline object literals for static styles.
- No CSS class names or Tailwind utility strings — RN uses a subset of CSS as JS objects.
- Use `StyleSheet.flatten()` to merge styles conditionally; avoid spreading style arrays unnecessarily.
- For dynamic/conditional styles, compose via array syntax: `style={[styles.base, isActive && styles.active]}`.

```tsx
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  active: { borderColor: "#0070f3", borderWidth: 2 },
});
```

## 3. Platform-Specific Code

- Use `Platform.OS === 'ios' | 'android'` for inline platform checks.
- For significant divergence, use platform-specific files: `Component.ios.tsx` / `Component.android.tsx`.
- Avoid `Platform.select()` for complex logic — split into platform files instead.

## 4. Lists

- Use `FlatList` or `SectionList` for scrollable lists — never `ScrollView` + `map()` for large datasets.
- Always provide `keyExtractor` returning a stable string ID.
- Provide `getItemLayout` when item height is fixed, for performance.

```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemRow item={item} />}
/>
```

## 5. Navigation (React Navigation)

- Use typed navigation props via `NativeStackScreenProps` / `useNavigation<NavigationProp<RootParamList>>()`.
- Define a central `RootParamList` type in `navigation/types.ts`.
- Never use string literals for route names — use a `ROUTES` constant object.

```ts
// navigation/types.ts
export type RootParamList = {
  Home: undefined;
  Profile: { userId: string };
};
```

## 6. Permissions & Native APIs

- Always check and request permissions before accessing camera, location, contacts, etc.
- Handle the `denied` and `blocked` states explicitly — show a fallback UI or settings deep-link.
- Wrap native module calls in `try/catch`; native errors are not always JS errors.

## 7. Performance

- Wrap expensive components with `React.memo()` and callbacks with `useCallback()`.
- Use `useMemo()` for computed list data passed to `FlatList`.
- Avoid anonymous functions in `renderItem` — define them outside the JSX.
- Use `InteractionManager.runAfterInteractions()` for heavy work that should wait for animations.

## 8. Accessibility

- Set `accessibilityLabel` and `accessibilityRole` on all interactive elements.
- Use `accessibilityHint` for non-obvious actions.
- Test with VoiceOver (iOS) and TalkBack (Android).
