# How to Add a New Feature

This guide walks you through adding a new feature to the application using the established patterns. We'll use the existing `sushi` feature as a reference.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step-by-Step Guide](#step-by-step-guide)
3. [Detailed Implementation](#detailed-implementation)
4. [Best Practices](#best-practices)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before adding a new feature, ensure you understand:

- **React Query** for server state management
- **TypeScript** for type safety
- **Zod** for schema validation
- **React Hook Form** for form handling
- **Nuqs** for URL state synchronization (if needed)
- The existing feature structure (review [FEATURES.md](FEATURES.md))

---

## 🚀 Step-by-Step Guide

Let's say we want to add a new **"Drink"** feature to manage drinks.

### Step 1: Create Feature Directory Structure

Create the following folder structure in `src/features/`:

```bash
src/features/drink/
├── api/
│   └── drink.ts
├── components/
│   ├── DrinkList.tsx
│   ├── DrinkItem.tsx
│   ├── DrinkFilter.tsx
│   ├── DrinkForm.tsx
│   ├── DrinkDetail.tsx
│   ├── DrinkSkeleton.tsx
│   ├── DrinkDetailSkeleton.tsx
│   └── DrinkAlertAction.tsx
├── hooks/
│   ├── useDrinkQuery.ts
│   ├── useDrinkDetailQuery.ts
│   └── useDrinkMutation.ts
├── lib/
│   └── filterParsers.ts
├── constants.ts
├── queryKeys.ts
└── types.ts
```

---

### Step 2: Define Types (`types.ts`)

Start by defining your TypeScript types:

```typescript
// src/features/drink/types.ts

import type { SORT_ORDER } from "@/constants/common";
import { SORT_OPTIONS, TYPE_OPTIONS } from "./constants";

export type DrinkType = "Alcoholic" | "Non-Alcoholic";

export type Drink = {
  id: string;
  name: string;
  price: number;
  type: DrinkType;
  volume: number; // in ml
  description: string;
  image: string;
  createdAt: string;
};

// Filter types
export type SortOption = keyof typeof SORT_OPTIONS;
export type TypeOption = keyof typeof TYPE_OPTIONS;

// Query parameters
export type DrinkQueryParams = {
  sortBy?: SortOption;
  order?: (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
  search?: string;
  type?: DrinkType;
};
```

---

### Step 3: Define Constants (`constants.ts`)

```typescript
// src/features/drink/constants.ts

export const SORT_OPTIONS = {
  price: "Price",
  name: "Name",
  volume: "Volume",
} as const;

export const TYPE_OPTIONS = {
  all: "All Types",
  Alcoholic: "Alcoholic",
  "Non-Alcoholic": "Non-Alcoholic",
} as const;

export const DRINK_TYPES = {
  ALCOHOLIC: "Alcoholic",
  NON_ALCOHOLIC: "Non-Alcoholic",
} as const;

export const FILTER_DEFAULTS = {
  SORT_BY: "name",
  TYPE: "all",
  SEARCH: "",
} as const;

export const FORM_DEFAULTS = {
  NAME: "",
  PRICE: undefined,
  TYPE: DRINK_TYPES.NON_ALCOHOLIC,
  VOLUME: undefined,
  DESCRIPTION: "",
  IMAGE: "",
} as const;

export const FORM_PLACEHOLDERS = {
  NAME: "Green Tea",
  PRICE: "0.00",
  VOLUME: "350",
  DESCRIPTION: "Refreshing green tea",
  IMAGE_URL: "https://example.com/image.jpg",
} as const;
```

---

### Step 4: Create Query Keys (`queryKeys.ts`)

```typescript
// src/features/drink/queryKeys.ts

import type { DrinkQueryParams } from "./types";

export const queryKeys = {
  all: () => ["drink"],
  list: (params?: DrinkQueryParams) => [...queryKeys.all(), "list", params],
  detail: (id: string | number) => [...queryKeys.all(), "detail", id],
} as const;
```

---

### Step 5: Add API Endpoints to Config

Update `src/config/endpoints.ts`:

```typescript
// src/config/endpoints.ts

export const endpoints = {
  // ... existing endpoints
  drink: {
    list: "/api/drinks",
    create: "/api/drinks",
    detail: (id: string) => `/api/drinks/${id}`,
    update: (id: string) => `/api/drinks/${id}`,
    delete: (id: string) => `/api/drinks/${id}`,
  },
};
```

---

### Step 6: Create API Layer (`api/drink.ts`)

```typescript
// src/features/drink/api/drink.ts

import { endpoints } from "@/config/endpoints";
import { axiosClient } from "@/lib/axiosClient";
import type { DrinkFormValues } from "@/schemas/drinkSchema";
import type { Drink, DrinkQueryParams } from "../types";

export async function fetchDrinks(
  params: DrinkQueryParams,
  signal: AbortSignal
): Promise<Drink[]> {
  const { data } = await axiosClient.get<Drink[]>(endpoints.drink.list, {
    params,
    signal,
  });
  return data;
}

export async function createDrink(drink: DrinkFormValues): Promise<Drink> {
  const payload = {
    ...drink,
    price: Number(drink.price),
    volume: Number(drink.volume),
  };

  const { data } = await axiosClient.post<Drink>(
    endpoints.drink.create,
    payload
  );
  return data;
}

export async function fetchDrinkById(
  id: string,
  signal: AbortSignal
): Promise<Drink> {
  const { data } = await axiosClient.get<Drink>(endpoints.drink.detail(id), {
    signal,
  });
  return data;
}

export async function deleteDrink(id: string): Promise<void> {
  await axiosClient.delete(endpoints.drink.delete(id));
}
```

---

### Step 7: Create Schema (`schemas/drinkSchema.ts`)

```typescript
// src/schemas/drinkSchema.ts

import { z } from "zod";
import { DRINK_TYPES } from "@/features/drink/constants";

export const drinkSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  type: z.enum([DRINK_TYPES.ALCOHOLIC, DRINK_TYPES.NON_ALCOHOLIC]),
  volume: z.coerce.number().positive("Volume must be positive"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Must be a valid URL"),
});

export type DrinkFormValues = z.infer<typeof drinkSchema>;
```

---

### Step 8: Create Hooks

#### Query Hook (`hooks/useDrinkQuery.ts`)

```typescript
// src/features/drink/hooks/useDrinkQuery.ts

import { useQueryStates } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchDrinks } from "../api/drink";
import { FILTER_DEFAULTS } from "../constants";
import { filterParsers } from "../lib/filterParsers";
import type { DrinkQueryParams, DrinkType } from "../types";

function useDrinkQuery() {
  const [filters] = useQueryStates(filterParsers);

  const params: DrinkQueryParams = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.sortBy) {
    params.sortBy = filters.sortBy;
  }

  if (filters.type && filters.type !== FILTER_DEFAULTS.TYPE) {
    params.type = filters.type as DrinkType;
  }

  return useQuery({
    queryKey: queryKeys.list(params),
    queryFn: ({ signal }) => fetchDrinks(params, signal),
  });
}

export default useDrinkQuery;
```

#### Detail Query Hook (`hooks/useDrinkDetailQuery.ts`)

```typescript
// src/features/drink/hooks/useDrinkDetailQuery.ts

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchDrinkById } from "../api/drink";

function useDrinkDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: ({ signal }) => fetchDrinkById(id, signal),
  });
}

export default useDrinkDetailQuery;
```

#### Mutation Hooks (`hooks/useDrinkMutation.ts`)

```typescript
// src/features/drink/hooks/useDrinkMutation.ts

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MESSAGES } from "@/constants/messages";
import type { DrinkFormValues } from "@/schemas/drinkSchema";
import { queryKeys } from "../queryKeys";
import { createDrink, deleteDrink } from "../api/drink";

export function useCreateDrink(options?: { onSuccess?: () => void }) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: DrinkFormValues) => createDrink(payload),
    onSuccess: () => {
      toast(MESSAGES.toasts.created("Drink"));
      qc.invalidateQueries({ queryKey: queryKeys.all() });
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || MESSAGES.toasts.errorGeneric);
    },
  });
}

export function useDeleteDrink() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDrink(id),
    onSuccess: () => {
      toast(MESSAGES.toasts.deleted("Drink"));
      qc.invalidateQueries({ queryKey: queryKeys.all() });
    },
    onError: (error: Error) => {
      toast.error(error.message || MESSAGES.toasts.errorGeneric);
    },
  });
}
```

#### Filter Parsers (`lib/filterParsers.ts`)

```typescript
// src/features/drink/lib/filterParsers.ts

import { parseAsStringEnum, parseAsString } from "nuqs";
import type { SortOption, TypeOption } from "../types";
import { SORT_OPTIONS, TYPE_OPTIONS, FILTER_DEFAULTS } from "../constants";

export const filterParsers = {
  search: parseAsString.withDefault(FILTER_DEFAULTS.SEARCH),
  sortBy: parseAsStringEnum<SortOption>(
    Object.keys(SORT_OPTIONS) as SortOption[]
  ).withDefault(FILTER_DEFAULTS.SORT_BY),
  type: parseAsStringEnum<TypeOption>(
    Object.keys(TYPE_OPTIONS) as TypeOption[]
  ).withDefault(FILTER_DEFAULTS.TYPE),
};
```

---

### Step 9: Create Components

Follow the pattern from `src/features/sushi/components/`:

1. **DrinkList.tsx** - Grid of drink items
2. **DrinkItem.tsx** - Individual drink card
3. **DrinkFilter.tsx** - Search, sort, type filters
4. **DrinkForm.tsx** - Create/edit form with validation
5. **DrinkDetail.tsx** - Detailed view
6. **DrinkSkeleton.tsx** - Loading placeholder
7. **DrinkDetailSkeleton.tsx** - Detail loading placeholder
8. **DrinkAlertAction.tsx** - Delete confirmation dialog

**Tip**: Copy from sushi components and adapt for drink-specific fields.

---

### Step 10: Create Pages

Create page components in `src/pages/`:

#### `DrinkPage.tsx`

```typescript
// src/pages/DrinkPage.tsx

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/stores/useSheet";
import useDrinkQuery from "@/features/drink/hooks/useDrinkQuery";
import DrinkList from "@/features/drink/components/DrinkList";
import DrinkFilter from "@/features/drink/components/DrinkFilter";
import DrinkForm from "@/features/drink/components/DrinkForm";

function DrinkPage() {
  const { data: drinks = [], isLoading } = useDrinkQuery();
  const { openSheet, closeSheet } = useSheet();

  const handleAddDrink = () => {
    openSheet({
      title: "Add New Drink",
      description: "Create a new drink item",
      content: <DrinkForm onSuccess={closeSheet} />,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Drinks</h1>
        <Button onClick={handleAddDrink}>
          <Plus className="mr-2 h-4 w-4" />
          Add Drink
        </Button>
      </div>

      <DrinkFilter />
      <DrinkList drinks={drinks} isLoading={isLoading} />
    </div>
  );
}

export default DrinkPage;
```

#### `DrinkDetailPage.tsx`

```typescript
// src/pages/DrinkDetailPage.tsx

import { useParams } from "react-router-dom";
import useDrinkDetailQuery from "@/features/drink/hooks/useDrinkDetailQuery";
import DrinkDetail from "@/features/drink/components/DrinkDetail";
import DrinkDetailSkeleton from "@/features/drink/components/DrinkDetailSkeleton";
import ErrorState from "@/components/commons/ErrorState";

function DrinkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: drink, isLoading, error } = useDrinkDetailQuery(id!);

  if (isLoading) return <DrinkDetailSkeleton />;
  if (error) return <ErrorState message="Failed to load drink" />;
  if (!drink) return <ErrorState message="Drink not found" />;

  return <DrinkDetail drink={drink} />;
}

export default DrinkDetailPage;
```

---

### Step 11: Add Routes

Update `src/routes.tsx`:

```typescript
// src/routes.tsx

import DrinkPage from "@/pages/DrinkPage";
import DrinkDetailPage from "@/pages/DrinkDetailPage";

// Inside your router configuration:
{
  path: ROUTES.drinks.root,
  element: <DrinkPage />,
},
{
  path: ROUTES.drinks.detail(":id"),
  element: <DrinkDetailPage />,
}
```

Update `src/constants/routes.ts`:

```typescript
// src/constants/routes.ts

export const ROUTES = {
  // ... existing routes
  drinks: {
    root: "/drinks",
    detail: (id: string) => `/drinks/${id}`,
  },
};
```

---

### Step 12: Add Navigation Link

Update `src/components/commons/AppSidebar.tsx`:

```typescript
// Add to navigation items
{
  title: "Drinks",
  url: ROUTES.drinks.root,
  icon: Coffee, // or any lucide-react icon
}
```

---

## ✅ Best Practices

### 1. **Naming Conventions**
- Components: PascalCase (`DrinkList.tsx`)
- Hooks: camelCase with `use` prefix (`useDrinkQuery.ts`)
- Files: Match component/function name
- Types: PascalCase (`DrinkType`)
- Constants: UPPER_SNAKE_CASE (`FILTER_DEFAULTS`)

### 2. **File Organization**
- Keep related files together in feature folder
- Use barrel exports (`index.ts`) for cleaner imports
- Separate concerns: API, hooks, components, types

### 3. **Type Safety**
- Define types before implementation
- Use discriminated unions for conditional types
- Leverage Zod for runtime validation

### 4. **Error Handling**
- Use toast notifications for user feedback
- Implement error boundaries for page-level errors
- Show error states in components

### 5. **Performance**
- Use React Query for automatic caching
- Implement loading skeletons for better UX
- Use AbortSignal for request cancellation

### 6. **State Management**
- Server state: React Query
- URL state: Nuqs (for filters)
- Global UI state: Zustand (dialogs, sheets)
- Local state: useState

---

## 🐛 Troubleshooting

### Issue: Queries not invalidating after mutation

**Solution**: Check that your query keys match:
```typescript
// In mutation
qc.invalidateQueries({ queryKey: queryKeys.all() });

// Ensure query uses same key factory
useQuery({ queryKey: queryKeys.list(params) });
```

---

### Issue: URL state not syncing

**Solution**: Ensure you're using `useQueryStates` with correct parsers:
```typescript
const [filters] = useQueryStates(filterParsers);
```

---

### Issue: Form validation not working

**Solution**: Check Zod schema and form integration:
```typescript
const form = useForm<DrinkFormValues>({
  resolver: zodResolver(drinkSchema),
  defaultValues: FORM_DEFAULTS,
});
```

---

### Issue: TypeScript errors with discriminated unions

**Solution**: Use type guards:
```typescript
if (drink.type === "Alcoholic") {
  // TypeScript knows this is Alcoholic
  console.log(drink.alcoholContent);
}
```

---

## 📚 Next Steps

After adding your feature:

1. ✅ Test all CRUD operations
2. ✅ Verify URL state synchronization
3. ✅ Check error handling
4. ✅ Test loading states
5. ✅ Ensure responsive design
6. ✅ Add unit tests (optional but recommended)
7. ✅ Update documentation if needed

---

## 🔗 Related Documentation

- [Features Module Structure →](FEATURES.md)
- [Architecture Decisions →](ARCHITECTURE_DECISIONS.md)
- [Project Structure →](PROJECT_STRUCTURE.md)

---

## 💡 Quick Reference Checklist

Use this checklist when adding a new feature:

- [ ] Create feature folder structure
- [ ] Define types in `types.ts`
- [ ] Add constants in `constants.ts`
- [ ] Create query keys in `queryKeys.ts`
- [ ] Add API endpoints to config
- [ ] Implement API layer in `api/`
- [ ] Create Zod schema in `schemas/`
- [ ] Build query hooks in `hooks/`
- [ ] Build mutation hooks in `hooks/`
- [ ] Create filter parsers (if needed)
- [ ] Build components in `components/`
- [ ] Create page components in `pages/`
- [ ] Add routes to `routes.tsx`
- [ ] Update route constants
- [ ] Add navigation link
- [ ] Test all functionality
- [ ] Update documentation

---

**Happy coding!** 🚀
