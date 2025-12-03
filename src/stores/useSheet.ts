import { create } from "zustand";

/**
 * State management for Sheet component
 * @property {string | null} title - The sheet title
 * @property {string | null} description - The sheet description
 * @property {boolean} isOpen - Whether the sheet is currently open
 * @property {React.ReactNode | null} content - The content to display in the sheet
 * @property {Function} onOpen - Function to open the sheet with content
 * @property {Function} onClose - Function to close the sheet
 */
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

/**
 * Zustand store hook for managing sheet state
 * @returns {SheetState} The sheet state and control functions
 * @example
 * const { onOpen, onClose, isOpen } = useSheet();
 * onOpen({ content: <div>Content</div>, title: "Sheet Title" });
 */
export const useSheet = create<SheetState>((set) => ({
  title: null,
  description: null,
  isOpen: false,
  content: null,
  onOpen: ({ content, title, description }) =>
    set({ isOpen: true, content, title, description }),
  onClose: () => set({ isOpen: false }),
}));
