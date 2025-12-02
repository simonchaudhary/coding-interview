import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSheet } from "@/stores/useSheet";

function GlobalSheet() {
  const { content, isOpen, onClose, title, description } = useSheet();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {content}
      </SheetContent>
    </Sheet>
  );
}

export default GlobalSheet;
