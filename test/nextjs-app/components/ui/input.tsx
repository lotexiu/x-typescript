import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  children,
  id,
  type,
  disabled,
  value,
  onChange,
  ...props 
}: React.ComponentProps<"input">) {
  return (
    <div 
      id={id}
      data-slot="input-wrapper" 
      className={cn(
        "transition-[color,box-shadow]  flex",
        "border border-input bg-input/30 px-3 py-1 rounded-md items-center gap-2 shadow-xs",
        "focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring",
        "aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "aria-disabled:opacity-60",
      )} aria-disabled={disabled}
    >
      {children}
      <input
        id={`input-${id}`}
        type={type}
        data-slot="input"
        onChange={(e)=> {value = e.target.value; onChange?.(e)}}
        className={cn(
          "disabled:pointer-events-none disabled:cursor-not-allowed grow w-0",
          "bg-transparent outline-none rounded-sm",
          "selection:text-primary-foreground selection:bg-primary",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-foreground",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
