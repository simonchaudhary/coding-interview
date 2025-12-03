export const MESSAGES = {
  buttons: {
    add: (title: string) => `Add ${title}`,
    edit: (title: string) => `Edit ${title}`,
    delete: (title: string) => `Delete ${title}`,
    cancel: "Cancel",
    close: "Close",
    Reset: "Reset",
    loading: "Loading...",
    back: "Back to Sushi List",
  },

  dialogs: {
    confirmDeleteTitle: "Confirm Delete",
    confirmDeleteBody: (title: string) =>
      `Are you sure you want to delete this ${title}?`,
    confirmGeneric: "Are you sure you want to continue?",
    yesDelete: "Yes, Delete",
    noCancel: "No, Cancel",
  },

  toasts: {
    created: (title: string) => `${title} created successfully.`,
    updated: (title: string) => `${title} updated successfully.`,
    deleted: (title: string) => `${title} deleted successfully.`,
    errorGeneric: "Something went wrong. Please try again.",
  },

  emptyStates: {
    sushi: {
      title: "No Sushi Yet",
      description:
        "Start building your sushi collection by adding your first item.",
      buttonText: "Add Sushi",
    },
  },
} as const;
