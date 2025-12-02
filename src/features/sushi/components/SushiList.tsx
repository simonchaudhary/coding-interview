import { Plus } from "lucide-react";

import { useSheet } from "@/stores/useSheet";
import { useDialog } from "@/stores/useDialog";
import { MESSAGES } from "@/constants/messages";
import EmptyState from "@/components/commons/EmptyState";
import ErrorState from "@/components/commons/ErrorState";

import SushiItem from "./SushiItem";
import { SushiForm } from "./SushiForm";
import SushiSkeleton from "./SushiSkeleton";
import SushiAlertAction from "./SushiAlertAction";
import useSushiQuery from "../hooks/useSushiQuery";

function SushiList() {
  const { data, isLoading, isError, error, refetch } = useSushiQuery();

  const { onOpen } = useDialog();
  const { onOpen: onOpenSheet } = useSheet();

  const onRemove = (id: string, name: string) => {
    onOpen({
      title: MESSAGES.dialogs.confirmDeleteTitle,
      description: MESSAGES.dialogs.confirmDeleteBody(name),
      content: <SushiAlertAction id={id} />,
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <SushiSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load sushi data"
        error={error}
        defaultMessage="An error occurred while fetching the sushi list. Please try again."
        onRetry={refetch}
      />
    );
  }

  if (!data || data.length === 0) {
    const handleAddSushi = () => {
      onOpenSheet({
        title: MESSAGES.buttons.add("Sushi"),
        content: <SushiForm />,
      });
    };

    return (
      <EmptyState
        icon={Plus}
        title={MESSAGES.emptyStates.sushi.title}
        description={MESSAGES.emptyStates.sushi.description}
        buttonText={MESSAGES.emptyStates.sushi.buttonText}
        buttonIcon={Plus}
        onButtonClick={handleAddSushi}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
      {data.map((item) => (
        <SushiItem
          key={item.id}
          item={item}
          onRemove={() => onRemove(item.id, item.name)}
        />
      ))}
    </div>
  );
}

export default SushiList;
