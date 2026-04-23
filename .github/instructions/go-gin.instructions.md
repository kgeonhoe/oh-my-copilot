---
description: "Use when writing, editing, or reviewing Go (.go) files. Enforces Go idioms, Gin handler structure, error handling, and API conventions."
applyTo: "**/*.go"
---

# Backend Coding Standards — Go + Gin

## 1. Handler Structure

Every Gin handler must follow a strict 4-step pipeline: **parse → validate → service → respond**.

```go
// Good
func CreateUser(c *gin.Context) {
    // 1. Parse
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, ErrorResponse(err))
        return
    }

    // 2. Validate (domain rules beyond binding tags)
    if err := req.Validate(); err != nil {
        c.JSON(http.StatusUnprocessableEntity, ErrorResponse(err))
        return
    }

    // 3. Service call
    user, err := userService.Create(c.Request.Context(), req)
    if err != nil {
        c.JSON(http.StatusInternalServerError, ErrorResponse(err))
        return
    }

    // 4. Respond
    c.JSON(http.StatusCreated, user)
}
```

- Always return immediately after `c.JSON(...)` on error paths.
- Never call service logic before binding/validation succeeds.

## 2. Error Handling

- Wrap errors at every boundary: `fmt.Errorf("createUser: %w", err)`.
- Use a unified `ErrorResponse` struct for all error JSON — never return raw `err.Error()` strings to clients.
- Distinguish between client errors (4xx) and server errors (5xx) explicitly.
- Never swallow errors with `_` unless you have a documented reason.

```go
// Good
if err != nil {
    return fmt.Errorf("db.GetUser: %w", err)
}

// Bad
if err != nil {
    return errors.New("something went wrong")
}
```

## 3. Request/Response Types

- Define explicit typed structs for every request and response — never use `interface{}`, `map[string]interface{}`, or `gin.H` for structured data.
- Use `binding:"required"` tags on all required fields.
- Use `json:"-"` on fields that must never be serialized to clients (passwords, internal flags).

```go
type CreateUserRequest struct {
    Email    string `json:"email"    binding:"required,email"`
    Password string `json:"password" binding:"required,min=8"`
}

type UserResponse struct {
    ID    uint   `json:"id"`
    Email string `json:"email"`
    // Password intentionally omitted
}
```

## 4. Route Registration

- Register all routes in a dedicated `RegisterRoutes(r *gin.Engine)` function — not inside `main()`.
- Group related routes under a common prefix with `r.Group(...)`.
- Apply middleware at the group level, not globally, unless the middleware truly applies everywhere.

```go
func RegisterRoutes(r *gin.Engine) {
    api := r.Group("/api/v1")
    {
        users := api.Group("/users", AuthMiddleware())
        users.GET("", ListUsers)
        users.POST("", CreateUser)
        users.GET("/:id", GetUser)
    }
}
```

## 5. Context and Concurrency

- Always pass `c.Request.Context()` into service and repository calls — never use `context.Background()` inside a handler.
- Do not store goroutines inside handlers without a `WaitGroup` or proper lifecycle management.
- Use `sync.Mutex` or channels for shared state — never raw reads/writes across goroutines.

## 6. Documentation

- Write GoDoc comments on all exported types, functions, and methods.
- GoDoc format: starts with the symbol name, ends with a period.

```go
// CreateUser handles POST /api/v1/users. It creates a new user account
// and returns the created user on success.
func CreateUser(c *gin.Context) { ... }
```
