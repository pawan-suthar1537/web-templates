import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-transparent font-medium outline-none transition-shadow [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-5.5 min-w-5.5 px-1 text-xs",
        sm: "h-5 min-w-5 rounded px-1 text-[10px]",
        lg: "h-6.5 min-w-6.5 px-1.5 text-sm",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground",
        error: "bg-destructive/10 text-destructive dark:bg-destructive/20",
        info: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
        outline: "border-input bg-background text-foreground",
        success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  ...props
}) {
  return (<span className={cn(badgeVariants({ size, variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
