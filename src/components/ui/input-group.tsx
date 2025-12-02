import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export interface InputGroupTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputGroupTextarea.displayName = "InputGroupTextarea";

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "block-start" | "block-end";
}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = "block-start", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          align === "block-end" && "justify-end",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
InputGroupAddon.displayName = "InputGroupAddon";

export interface InputGroupTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
InputGroupText.displayName = "InputGroupText";

export { InputGroup, InputGroupTextarea, InputGroupAddon, InputGroupText };
