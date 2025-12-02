import { useDialog } from "@/stores/useDialog";
import { Button } from "@/components/ui/button";
import { MESSAGES } from "@/constants/messages";

import { useDeleteSushi } from "../hooks/useSushiMutation";

type SushiAlertActionProps = {
  id: string;
};

function SushiAlertAction(props: SushiAlertActionProps) {
  const { id } = props;

  const { onClose } = useDialog();

  const deleteSushiMutate = useDeleteSushi();

  const onRemove = () => {
    deleteSushiMutate.mutate(id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="flex justify-end gap-3 mt-4">
      <Button
        variant="outline"
        onClick={onClose}
        disabled={deleteSushiMutate.isPending}
      >
        {MESSAGES.buttons.cancel}
      </Button>

      <Button
        variant="destructive"
        onClick={onRemove}
        disabled={deleteSushiMutate.isPending}
      >
        {deleteSushiMutate.isPending
          ? MESSAGES.buttons.loading
          : MESSAGES.dialogs.yesDelete}
      </Button>
    </div>
  );
}

export default SushiAlertAction;
