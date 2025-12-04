import { AlertCircle } from "lucide-react";
import { type FallbackProps } from "react-error-boundary";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="px-4 max-w-2xl mx-auto mt-8">
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          <p className="mb-2">{error.message}</p>

          <Button
            variant="outline"
            size="sm"
            onClick={resetErrorBoundary}
            className="mt-3"
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default ErrorFallback;
