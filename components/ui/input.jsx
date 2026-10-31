import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <span className={cn(
      "relative inline-flex w-full rounded-lg border border-input bg-background shadow-xs transition-shadow focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/10 disabled:opacity-60",
      className
    )}>
      <input
        type={type}
        className="h-9 w-full min-w-0 rounded-[inherit] bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 file:me-3 file:border-0 file:bg-transparent file:font-medium file:text-foreground disabled:cursor-not-allowed"
        ref={ref}
        {...props}
      />
    </span>
  );
})
Input.displayName = "Input"

export { Input }
