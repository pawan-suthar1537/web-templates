import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-lg bg-muted/80", className)} aria-hidden="true" {...props} />);
}

export { Skeleton }
