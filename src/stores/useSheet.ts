import { create } from "zustand";

type SheetState = {
  title: string | null;
  description: string | null;
  isOpen: boolean;
  content: React.ReactNode | null;
  onOpen: (option: {
    content: React.ReactNode;
    title: string;
    description?: string;
  }) => void;
  onClose: () => void;
};

export const useSheet = create<SheetState>((set) => ({
  title: null,
  description: null,
  isOpen: false,
  content: null,
  onOpen: ({ content, title, description }) =>
    set({ isOpen: true, content, title, description }),
  onClose: () => set({ isOpen: false }),
}));
