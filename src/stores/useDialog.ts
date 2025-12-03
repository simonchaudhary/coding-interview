import { create } from "zustand";

/**
 * State management for Dialog component
 * @property {string | null} title - The dialog title
 * @property {string | null} description - The dialog description
 * @property {boolean} isOpen - Whether the dialog is currently open
 * @property {React.ReactNode | null} content - The content to display in the dialog
 * @property {Function} onOpen - Function to open the dialog with content
 * @property {Function} onClose - Function to close the dialog
 */
type DialogState = {
  title: string | null;
  description: string | null;
  isOpen: boolean;
  content: React.ReactNode | null;
  onOpen: (option: {
    content: React.ReactNode;
    title: string;
    description: string;
  }) => void;
  onClose: () => void;
};

/**
 * Zustand store hook for managing dialog state
 * @returns {DialogState} The dialog state and control functions
 * @example
 * const { onOpen, onClose, isOpen } = useDialog();
 * onOpen({ content: <div>Content</div>, title: "Dialog Title", description: "Description" });
 */
export const useDialog = create<DialogState>((set) => ({
  title: null,
  description: null,
  isOpen: false,
  content: null,
  onOpen: ({ content, title, description }) =>
    set({ isOpen: true, content, title, description }),
  onClose: () => set({ isOpen: false }),
}));
