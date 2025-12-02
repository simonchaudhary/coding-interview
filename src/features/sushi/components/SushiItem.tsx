import { X } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

import type { Sushi, SushiType } from "../types";
import { SUSHI_ITEM_LABELS, SUSHI_TYPES } from "../constants";

/**
 * Renders secondary information based on the type of sushi.
 * @param item - The sushi item.
 * @returns An object containing the label and value for the secondary information.
 */
function renderSecondaryInfo(
  item: Sushi
): Record<SushiType, { label: string; value: string | number | null }> {
  return {
    [SUSHI_TYPES.NIGIRI]: {
      label: SUSHI_ITEM_LABELS.NIGIRI,
      value: item.fish,
    },
    [SUSHI_TYPES.ROLL]: {
      label: SUSHI_ITEM_LABELS.ROLL,
      value: item.pieces,
    },
  };
}

interface SushiItemProps {
  item: Sushi;
  onRemove: (id: string) => void;
}

function SushiItem(props: SushiItemProps) {
  const { item, onRemove } = props;

  const { id, name, type, price, image } = item;

  return (
    <Card className="relative">
      <CardContent>
        <Button
          variant="ghost"
          onClick={() => onRemove(id)}
          className="absolute top-4 right-4 cursor-pointer hover:text-red-600 z-10"
          aria-label="Remove item"
        >
          <X className="w-5 h-5" />
        </Button>

        <Link to={`/${ROUTES.sushiDetail(id)}`} className="block">
          <div className="flex gap-4 hover:opacity-80 transition-opacity">
            <img
              src={image}
              alt={name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1 space-y-2">
              <h3
                title={name}
                className="text-base font-semibold line-clamp-2 text-gray-700"
              >
                {name}
              </h3>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-700">{type}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    {renderSecondaryInfo(item)[item.type]?.label || "-"}
                  </span>
                  <span className="font-medium text-gray-700">
                    {renderSecondaryInfo(item)[item.type]?.value || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="font-semibold text-base text-gray-700">
                    ${price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

export default SushiItem;
