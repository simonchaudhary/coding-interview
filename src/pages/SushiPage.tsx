import { Button } from "@/components/ui/button";

import SushiList from "@/features/sushi/components/SushiList";
import SushiForm from "@/features/sushi/components/SushiForm";
import SushiFilter from "@/features/sushi/components/SushiFilter";

import { useSheet } from "@/stores/useSheet";

import { MESSAGES } from "@/constants/messages";

function SushiPage() {
  const { onOpen } = useSheet();

  const onAddSushiFormOpen = () => {
    onOpen({
      title: "Create Sushi Item",
      description: "Add a new sushi item to the menu.",
      content: <SushiForm />,
    });
  };

  return (
    <>
      <SushiFilter
        trailing={
          <Button
            onClick={onAddSushiFormOpen}
            className="w-full bg-blue-700 hover:bg-blue-800"
          >
            {MESSAGES.buttons.add("Sushi")}
          </Button>
        }
      />

      <SushiList />
    </>
  );
}

export default SushiPage;
