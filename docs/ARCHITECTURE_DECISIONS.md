# Architecture Decision Records (ADR)

This document records the key architectural decisions made in this project, explaining the reasoning behind technology choices and structural patterns.

---

## 📋 Table of Contents

1. [ADR-001: Feature-Based Architecture](#adr-001-feature-based-architecture)
2. [ADR-002: React Query for Server State](#adr-002-react-query-for-server-state)
3. [ADR-003: Zustand for Global UI State](#adr-003-zustand-for-global-ui-state)
4. [ADR-004: Nuqs for URL State Management](#adr-004-nuqs-for-url-state-management)
5. [ADR-005: Zod for Schema Validation](#adr-005-zod-for-schema-validation)
6. [ADR-006: Shadcn UI Component Library](#adr-006-shadcn-ui-component-library)
7. [ADR-007: Axios for HTTP Client](#adr-007-axios-for-http-client)
8. [ADR-008: TypeScript Discriminated Unions](#adr-008-typescript-discriminated-unions)
9. [ADR-009: Query Key Factory Pattern](#adr-009-query-key-factory-pattern)
10. [ADR-010: Error Boundary Strategy](#adr-010-error-boundary-strategy)

---

## ADR-001: Feature-Based Architecture

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed to decide on a scalable folder structure that would:
- Support multiple domain-specific features
- Keep related code together
- Scale well as the application grows
- Be easy for new developers to understand

### Decision

We adopted a **feature-based (modular) architecture** where each feature is self-contained in its own folder with dedicated subfolders for API, components, hooks, and types.

```
src/features/
└── [feature-name]/
    ├── api/          # HTTP requests
    ├── components/   # Feature UI
    ├── hooks/        # Data fetching
    ├── lib/          # Helpers
    ├── constants.ts  # Feature config
    ├── queryKeys.ts  # Cache keys
    └── types.ts      # Type definitions
```

### Alternatives Considered

1. **Layer-based architecture** (all components together, all hooks together)
   - ❌ Hard to locate feature-specific code
   - ❌ Difficult to isolate features
   - ❌ Grows unwieldy as app scales

2. **Domain-Driven Design (DDD)**
   - ❌ Too complex for this project size
   - ❌ Steep learning curve

### Consequences

**Positive**:
- ✅ Clear separation of concerns
- ✅ Easy to locate feature code
- ✅ Features are portable/removable
- ✅ Scales well with team size
- ✅ Easier to onboard new developers

**Negative**:
- ⚠️ Some code duplication across features
- ⚠️ Need to decide what belongs in shared vs feature folders

---

## ADR-002: React Query for Server State

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed a robust solution for managing server state (data fetching, caching, synchronization) that would:
- Handle loading and error states automatically
- Provide intelligent caching
- Support background refetching
- Minimize boilerplate code

### Decision

We chose **TanStack Query (React Query)** as our server state management library.

### Alternatives Considered

1. **Redux + Redux Toolkit Query**
   - ❌ More boilerplate
   - ❌ Steeper learning curve
   - ❌ Overkill for this use case

2. **SWR (Vercel)**
   - ✅ Simpler API
   - ❌ Less features than React Query
   - ❌ Smaller ecosystem

3. **Plain useEffect + fetch**
   - ❌ Need to manually handle caching
   - ❌ Need to manually handle loading states
   - ❌ More code to maintain

### Consequences

**Positive**:
- ✅ Automatic caching and background refetching
- ✅ Built-in loading/error states
- ✅ Query invalidation for data consistency
- ✅ Excellent TypeScript support
- ✅ DevTools for debugging
- ✅ Request deduplication
- ✅ Large community and ecosystem

**Negative**:
- ⚠️ Additional dependency
- ⚠️ Learning curve for new developers

---

## ADR-003: Zustand for Global UI State

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed a lightweight solution for managing global UI state like:
- Dialog/modal open/close state
- Sheet (slide-out panel) state
- Global notifications

This state is separate from server state and doesn't need persistence.

### Decision

We chose **Zustand** for global UI state management.

### Alternatives Considered

1. **React Context API**
   - ❌ Can cause unnecessary re-renders
   - ❌ Verbose boilerplate
   - ❌ No built-in selectors

2. **Redux**
   - ❌ Too much boilerplate for simple UI state
   - ❌ Overkill for our needs

3. **Jotai/Recoil**
   - ✅ Modern atomic state
   - ❌ More complex API
   - ❌ Smaller ecosystem

### Consequences

**Positive**:
- ✅ Minimal boilerplate (simple API)
- ✅ No Provider needed
- ✅ Automatic re-render optimization
- ✅ Excellent TypeScript support
- ✅ Small bundle size (~1KB)
- ✅ Easy to test

**Negative**:
- ⚠️ Less opinionated (need to establish patterns)

### Example Usage

```typescript
// src/stores/useDialog.ts
const useDialog = create<DialogStore>((set) => ({
  isOpen: false,
  content: null,
  openDialog: (content) => set({ isOpen: true, content }),
  closeDialog: () => set({ isOpen: false, content: null }),
}));
```

---

## ADR-004: Nuqs for URL State Management

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed to synchronize filter state (search, sort, type) with the URL for:
- Shareable links
- Browser back/forward navigation
- Persistent state across refreshes

### Decision

We chose **Nuqs** for URL state synchronization.

### Alternatives Considered

1. **Manual URLSearchParams + useNavigate**
   - ❌ Verbose and error-prone
   - ❌ No TypeScript safety
   - ❌ Manual serialization/parsing

2. **React Router's useSearchParams**
   - ❌ Basic API, no type safety
   - ❌ Manual parsing needed
   - ❌ No validation

3. **Zod-search-params**
   - ✅ Type-safe
   - ❌ More verbose API
   - ❌ Less ergonomic

### Consequences

**Positive**:
- ✅ Type-safe URL state
- ✅ Automatic parsing/serialization
- ✅ Built-in default values
- ✅ Enum support
- ✅ Seamless React Query integration
- ✅ Minimal re-renders

**Negative**:
- ⚠️ Smaller community than alternatives
- ⚠️ Additional dependency

### Example Usage

```typescript
const filterParsers = {
  search: parseAsString.withDefault(""),
  sortBy: parseAsStringEnum<SortOption>(["price", "name"]).withDefault("name"),
};

const [filters, setFilters] = useQueryStates(filterParsers);
```

---

## ADR-005: Zod for Schema Validation

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed runtime validation for:
- Form inputs
- API responses
- User data

We also wanted TypeScript type inference from schemas to avoid type duplication.

### Decision

We chose **Zod** for schema validation and type inference.

### Alternatives Considered

1. **Yup**
   - ✅ Popular, mature
   - ❌ Worse TypeScript inference
   - ❌ Larger bundle size

2. **Joi**
   - ❌ Not designed for TypeScript
   - ❌ Larger bundle size

3. **Valibot**
   - ✅ Smaller bundle
   - ❌ Newer, smaller ecosystem
   - ❌ Less documentation

### Consequences

**Positive**:
- ✅ Excellent TypeScript inference
- ✅ Type-safe schema definition
- ✅ Small bundle size (tree-shakeable)
- ✅ Works with React Hook Form
- ✅ Rich validation methods
- ✅ Composable schemas

**Negative**:
- ⚠️ Slightly steeper learning curve than Yup

### Example Usage

```typescript
const drinkSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive(),
  type: z.enum(["Alcoholic", "Non-Alcoholic"]),
});

type DrinkFormValues = z.infer<typeof drinkSchema>;
```

---

## ADR-006: Shadcn UI Component Library

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed a component library that:
- Provides high-quality, accessible components
- Allows customization
- Doesn't add significant bundle size
- Integrates well with Tailwind CSS

### Decision

We chose **Shadcn UI** as our component library approach.

### Alternatives Considered

1. **Material UI (MUI)**
   - ❌ Large bundle size
   - ❌ Opinionated styles
   - ❌ Difficult to customize deeply

2. **Chakra UI**
   - ✅ Great DX
   - ❌ Runtime CSS-in-JS overhead
   - ❌ Larger bundle

3. **Headless UI + custom styling**
   - ✅ Flexible
   - ❌ More work to build components

4. **Radix UI directly**
   - ✅ Unstyled primitives
   - ❌ Need to style everything

### Consequences

**Positive**:
- ✅ Copy-paste components (full control)
- ✅ Built on Radix UI (accessible)
- ✅ Tailwind CSS integration
- ✅ No runtime overhead
- ✅ Only bundle what you use
- ✅ Easy to customize

**Negative**:
- ⚠️ Not a traditional npm package
- ⚠️ Need to manage component updates manually
- ⚠️ Components live in your codebase

---

## ADR-007: Axios for HTTP Client

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed an HTTP client for API requests with:
- Request/response interceptors
- Automatic error handling
- TypeScript support
- AbortSignal support

### Decision

We chose **Axios** as our HTTP client.

### Alternatives Considered

1. **Fetch API**
   - ✅ Native, no dependency
   - ❌ More verbose
   - ❌ No interceptors
   - ❌ Need to handle errors manually

2. **Ky**
   - ✅ Modern, fetch-based
   - ❌ Smaller ecosystem
   - ❌ Less familiar to developers

### Consequences

**Positive**:
- ✅ Request/response interceptors (auth, logging)
- ✅ Automatic JSON parsing
- ✅ Centralized error handling
- ✅ Large ecosystem
- ✅ Familiar API

**Negative**:
- ⚠️ Additional dependency
- ⚠️ Slightly larger than fetch

### Implementation

```typescript
// src/lib/axiosClient.ts
export const axiosClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

## ADR-008: TypeScript Discriminated Unions

**Status**: Accepted

**Date**: 2025-01-05

### Context

For the sushi feature, we have different types (Nigiri, Roll) with conditional fields:
- Nigiri requires `fishType`, pieces are optional
- Roll requires `pieces`, fishType is optional

We needed type-safe handling of these variants.

### Decision

We use **TypeScript discriminated unions** with a `type` discriminator.

### Alternatives Considered

1. **Single type with all optional fields**
   - ❌ No type safety for required fields
   - ❌ Can't enforce business rules

2. **Separate types without union**
   - ❌ Hard to handle polymorphically
   - ❌ API would need separate endpoints

### Consequences

**Positive**:
- ✅ Type safety for conditional fields
- ✅ Automatic type narrowing
- ✅ Self-documenting code
- ✅ Compile-time checks

**Negative**:
- ⚠️ Need type guards for narrowing
- ⚠️ Slightly more complex

### Example

```typescript
type Nigiri = {
  type: "Nigiri";
  fishType: string;      // Required
  pieces: number | null; // Optional
};

type Roll = {
  type: "Roll";
  pieces: number | null;   // Required
  fishType: string | null; // Optional
};

type Sushi = Nigiri | Roll;

// Type narrowing
if (sushi.type === "Nigiri") {
  console.log(sushi.fishType); // TypeScript knows this exists
}
```

---

## ADR-009: Query Key Factory Pattern

**Status**: Accepted

**Date**: 2025-01-05

### Context

React Query requires query keys for caching. We needed:
- Consistent key structure
- Easy invalidation of related queries
- Type-safe key generation

### Decision

We use the **Query Key Factory Pattern** where each feature has a `queryKeys.ts` file with hierarchical key generation.

### Alternatives Considered

1. **Inline string keys**
   - ❌ Error-prone
   - ❌ Hard to invalidate related queries
   - ❌ No type safety

2. **Centralized keys file**
   - ❌ Doesn't scale with features
   - ❌ Violates feature encapsulation

### Consequences

**Positive**:
- ✅ Centralized per feature
- ✅ Hierarchical invalidation
- ✅ Type-safe
- ✅ Easy to test

**Negative**:
- ⚠️ Need to maintain consistency

### Example

```typescript
export const queryKeys = {
  all: () => ["sushi"],
  list: (params?) => [...queryKeys.all(), "list", params],
  detail: (id) => [...queryKeys.all(), "detail", id],
};

// Invalidate all sushi queries
queryClient.invalidateQueries({ queryKey: queryKeys.all() });
```

---

## ADR-010: Error Boundary Strategy

**Status**: Accepted

**Date**: 2025-01-05

### Context

We needed a robust error handling strategy for:
- React component errors
- Network errors
- Unexpected runtime errors

### Decision

We implement a **layered error boundary approach**:
1. Root-level error boundary (catches all errors)
2. Feature-level error boundaries (per route)
3. Component-level error states (for data fetching)

### Alternatives Considered

1. **Single global error boundary**
   - ❌ Crashes entire app
   - ❌ Poor UX

2. **Try-catch everywhere**
   - ❌ Doesn't catch render errors
   - ❌ Verbose

### Consequences

**Positive**:
- ✅ Graceful error recovery
- ✅ Better UX (partial failures)
- ✅ Error isolation
- ✅ Custom error UI per level

**Negative**:
- ⚠️ Need to decide boundary placement
- ⚠️ More boilerplate

### Implementation

```typescript
// Root level
<ErrorBoundaryProvider>
  <App />
</ErrorBoundaryProvider>

// Feature level
<Route element={
  <ErrorBoundary fallback={<ErrorFallback />}>
    <SushiPage />
  </ErrorBoundary>
} />
```

---

## 📊 Technology Stack Summary

| Category | Technology | Reason |
|----------|-----------|--------|
| **UI Framework** | React 18 | Modern, widely adopted, hooks API |
| **Language** | TypeScript | Type safety, better DX |
| **Routing** | React Router v6 | Standard, feature-rich |
| **Server State** | TanStack Query | Best-in-class caching, DX |
| **Global UI State** | Zustand | Lightweight, simple API |
| **URL State** | Nuqs | Type-safe, ergonomic |
| **Forms** | React Hook Form | Performance, DX |
| **Validation** | Zod | Type inference, composability |
| **HTTP Client** | Axios | Interceptors, familiar |
| **UI Components** | Shadcn UI | Customizable, accessible |
| **Styling** | Tailwind CSS | Utility-first, fast development |
| **Testing** | Vitest | Fast, Vite-native |

---

## 🔮 Future Considerations

### Potential ADRs for Future Features

1. **Authentication Strategy**
   - JWT vs Session-based
   - Where to store tokens
   - Refresh token handling

2. **Real-time Updates**
   - WebSockets vs Polling
   - Server-Sent Events

3. **Internationalization (i18n)**
   - react-i18next vs next-intl
   - Translation management

4. **Testing Strategy**
   - Unit vs Integration test ratio
   - E2E testing framework (Playwright, Cypress)

5. **Performance Monitoring**
   - Sentry, LogRocket, or similar

---

## 🔗 Related Documentation

- [Project Structure →](PROJECT_STRUCTURE.md)
- [Features Module →](FEATURES.md)
- [How to Add a Feature →](HOW_TO_ADD_FEATURE.md)

---

## 📝 ADR Template

When adding a new ADR, use this template:

```markdown
## ADR-XXX: [Title]

**Status**: [Proposed | Accepted | Deprecated | Superseded]

**Date**: YYYY-MM-DD

### Context
What is the issue we're trying to solve?

### Decision
What did we decide to do?

### Alternatives Considered
1. Option 1
   - ✅ Pros
   - ❌ Cons

### Consequences
**Positive**:
- ✅ Benefit 1

**Negative**:
- ⚠️ Trade-off 1

### Example (optional)
Code example showing the decision in action
```

---

**Last Updated**: 2025-01-05
