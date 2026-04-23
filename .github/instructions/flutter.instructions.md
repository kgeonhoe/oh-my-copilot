---
description: "Use when writing, editing, or reviewing Flutter/Dart (.dart) files. Enforces widget composition, state management, Dart conventions, and Flutter best practices."
applyTo: "**/*.dart"
---

# Flutter / Dart Coding Standards

## 1. Dart Language Conventions

- Enable and respect `dart analyze` with strict lints (`flutter_lints` or `very_good_analysis`).
- Use `final` for all variables that are not reassigned; use `const` for compile-time constants.
- Prefer named parameters over positional for any function with more than one parameter.
- Use `??`, `?.`, and `!` (null assertion) conservatively — prefer early returns or null-safe patterns.
- Every public class, method, and property must have a DartDoc comment (`///`).

```dart
/// Formats a [DateTime] into a human-readable string.
///
/// Returns a string like "April 22, 2026".
String formatDate(DateTime date) { ... }
```

## 2. Widget Composition

- Prefer `StatelessWidget` by default; use `StatefulWidget` only when local mutable state is truly needed.
- Extract large `build()` methods into smaller private widgets or methods — keep `build()` under ~50 lines.
- Use `const` constructors everywhere possible to enable widget tree optimization.
- Never put business logic inside `build()` — delegate to controllers, notifiers, or blocs.

```dart
// Good
const MyButton(key: key, label: 'Submit');

// Bad — prevents const optimization
MyButton(label: 'Submit ${DateTime.now()}');
```

## 3. State Management

- Use `flutter_riverpod` (preferred) or `provider` for app-level state.
- Define providers at the top level of a file — never inside a widget class.
- Use `StateNotifier` / `Notifier` for mutable state; `FutureProvider` / `StreamProvider` for async.
- Keep providers small and focused: one provider per domain concern.

```dart
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});
```

## 4. Layout & Styling

- Use `Theme.of(context)` and `TextTheme` for all colors, fonts, and sizes — no hardcoded hex values.
- Define the app theme in one place (`ThemeData`) and use `ColorScheme` tokens.
- Prefer `Padding`, `SizedBox`, and `Spacer` over magic number margins inside `Container`.
- Use `MediaQuery` or `LayoutBuilder` for responsive layouts.

## 5. Navigation

- Use `go_router` for declarative, type-safe routing.
- Define all routes in a central `AppRouter` class.
- Never use `Navigator.pushNamed()` with raw strings — use typed route constants.

## 6. Async & Streams

- Use `async/await` over raw `Future.then()` chains.
- Always handle errors in `async` functions with `try/catch` — never leave `Future`s unhandled.
- Cancel `StreamSubscription`s in `dispose()` to prevent memory leaks.

```dart
@override
void dispose() {
  _subscription.cancel();
  super.dispose();
}
```

## 7. File & Folder Structure

- One class per file; file name matches class name in `snake_case` (e.g., `user_card.dart`).
- Organize by feature: `features/auth/`, `features/profile/`, not by layer.
- Barrel files (`index.dart`) are acceptable for public API of a feature folder.

## 8. Testing

- Write unit tests for all business logic (notifiers, use cases, utils).
- Write widget tests for non-trivial UI components using `WidgetTester`.
- Use `mocktail` or `mockito` for mocking dependencies.
- Golden tests are encouraged for pixel-sensitive components.
