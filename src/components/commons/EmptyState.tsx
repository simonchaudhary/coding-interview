import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonIcon?: LucideIcon;
}

function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  buttonIcon: ButtonIcon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12">
      <div className="text-center space-y-4 max-w-md">
        {Icon && (
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
              <Icon className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {buttonText && onButtonClick && (
          <Button onClick={onButtonClick} size="lg" className="mt-4">
            {ButtonIcon && <ButtonIcon className="w-5 h-5 mr-2" />}
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
