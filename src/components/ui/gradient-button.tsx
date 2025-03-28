
import React from 'react';
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const gradientButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-huduma-green to-huduma-teal text-white hover:shadow-glow",
        outline: "bg-white dark:bg-gray-800 text-huduma-green hover:text-white border-2 border-transparent before:absolute before:inset-0 before:rounded-md before:p-[2px] before:bg-gradient-to-r before:from-huduma-green before:to-huduma-teal before:-z-10 hover:before:opacity-100 before:opacity-80",
        purple: "bg-gradient-to-r from-huduma-purple to-huduma-blue text-white hover:shadow-md",
        yellow: "bg-gradient-to-r from-huduma-yellow to-orange-500 text-white hover:shadow-md",
        coral: "bg-gradient-to-r from-huduma-coral to-red-400 text-white hover:shadow-md",
        glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-md hover:shadow-lg",
        neon: "relative text-white before:absolute before:inset-0 before:rounded-md before:-z-10 before:bg-gradient-to-r before:from-huduma-green before:via-huduma-teal before:to-huduma-blue before:animate-gradient-shift border border-white/20 backdrop-blur-sm hover:shadow-glow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-lg px-8 text-lg",
        icon: "h-10 w-10 rounded-full",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        none: "rounded-none",
      },
      glow: {
        default: "hover:shadow-none",
        true: "hover:shadow-[0_0_15px_rgba(26,135,83,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      glow: "default",
    },
  }
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, rounded, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, rounded, glow, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton, gradientButtonVariants };
