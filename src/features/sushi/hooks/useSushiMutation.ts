import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { MESSAGES } from "@/constants/messages";

import type { SushiFormValues } from "@/schemas/sushiSchema";

import { queryKeys } from "../queryKeys";

import { createSushi, deleteSushi } from "../api/sushi";

/**
 * Hook for creating a new sushi item
 * Automatically invalidates queries and shows success/error toasts
 * @param {Object} [options] - Optional callbacks
 * @param {Function} [options.onSuccess] - Callback to execute after successful creation
 * @returns {UseMutationResult} Mutation result with mutate function and states
 */
export function useCreateSushi(options?: { onSuccess?: () => void }) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SushiFormValues) => createSushi(payload),
    onSuccess: () => {
      toast(MESSAGES.toasts.created("Sushi"));

      qc.invalidateQueries({ queryKey: queryKeys.all() });

      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || MESSAGES.toasts.errorGeneric);
    },
  });
}

/**
 * Hook for deleting a sushi item by ID
 * Automatically invalidates queries and shows success/error toasts
 * @returns {UseMutationResult} Mutation result with mutate function and states
 */
export function useDeleteSushi() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSushi(id),
    onSuccess: () => {
      toast(MESSAGES.toasts.deleted("Sushi"));

      qc.invalidateQueries({ queryKey: queryKeys.all() });
    },
    onError: (error: Error) => {
      toast.error(error.message || MESSAGES.toasts.errorGeneric);
    },
  });
}
