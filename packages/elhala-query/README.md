# elhala-query 📦

A lightweight, educational implementation of React Query concepts with Suspense support.

> 🧠 "El Hala" (الحالة) means _"state"_ in Arabic.

## Educational Purpose

**elhala-query** is a minimal, beginner-friendly clone of React Query, built **strictly for educational purposes**. This project demonstrates core data fetching concepts including Suspense integration and cache management.

⚠️ **IMPORTANT**: Not for production use. Missing production-grade optimizations and extensive testing.

## Keywords

`react`, `query`, `suspense`, `data-fetching`, `state-management`, `error-boundaries`, `educational`, `react-query`, `hooks`, `cache`

## Learning Goals

Learn through code:

- Query caching mechanisms
- Suspense integration patterns
- Error Boundary integration
- State management for async operations
- Refetch/Stale-while-revalidate patterns
- Core React Query concepts simplified

## Features

- Traditional loading/error states
- Suspense mode support
- Error Boundary integration
- Automatic cache garbage collection
- Stale-while-revalidate pattern
- Manual refetching
- Query deduplication

## Basic Usage

### Traditional Loading States

```jsx
import { useQuery } from "elhala-query";

function UserProfile({ userId }) {
  const { data, isLoading, error, refetch } = useQuery(["user", userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Suspense Mode

```jsx
import { useSuspenseQuery } from "elhala-query";
import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

function Profile() {
  const { data, refetch } = useSuspenseQuery(["profile"], () =>
    fetch("/api/profile").then((res) => res.json())
  );

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={refetch}>
        {data.isFetching ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary fallback={<div>Error loading profile!</div>}>
      <Suspense fallback={<div>Loading profile...</div>}>
        <Profile />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Mutation API

### `useMutation`

Manage side-effects with full lifecycle tracking:

```jsx
import { useMutation } from "elhala-query";

function AddTodo() {
  const { mutate, isLoading, isError, error } = useMutation((newTodo) =>
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title: e.target.title.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Todo"}
      </button>
      {isError && <div>Error: {error.message}</div>}
    </form>
  );
}
```

## Key Concepts Demonstrated

### **Suspense Integration**

- Promise throwing/reconciliation
- Suspense/Error Boundary coordination
- Re-suspension on refetch/stale data

### **Cache Management**

- Query deduplication
- Stale-time configuration
- Cache garbage collection

### **State Transitions**

- Loading/error/success states
- Background refetch indicators
- Optimistic updates pattern

## For Learners

**Recommended learning path:**

1. Study the `createQuery` cache implementation
2. Examine `useSuspenseQuery` Suspense integration
3. Explore `QueryObserver` state management
4. Implement a new feature (e.g., optimistic updates)
5. Compare with React Query's production implementation

## Production Alternatives

While elhala-query demonstrates Suspense patterns, consider these for production:

- [TanStack Query (React Query)](https://tanstack.com/query/)
- [SWR](https://swr.vercel.app/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

## Contribution

This project is maintained for educational purposes. Contributions through issues/pull requests are welcome for educational improvements.
