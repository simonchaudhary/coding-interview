import { type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/commons/ErrorFallback";

type ErrorBoundaryProviderProps = {
  children: ReactNode;
  onReset?: () => void;
};

function ErrorBoundaryProvider({
  children,
  onReset,
}: ErrorBoundaryProviderProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryProvider;
