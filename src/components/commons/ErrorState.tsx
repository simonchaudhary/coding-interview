import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  error?: Error | unknown;
  defaultMessage?: string;
  onRetry?: () => void;
  retryButtonText?: string;
};

function ErrorState({
  title = "Unable to load data",
  error,
  defaultMessage = "An error occurred while fetching data. Please try again.",
  onRetry,
  retryButtonText = "Try Again",
}: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : defaultMessage;

  return (
    <div className="px-4 max-w-2xl mx-auto">
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>{errorMessage}</p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3"
            >
              {retryButtonText}
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default ErrorState;
