import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDialog } from "@/stores/useDialog";

function GlobalDialog() {
  const { isOpen, onClose, content, title, description } = useDialog();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {content}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default GlobalDialog;
