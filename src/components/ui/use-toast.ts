
// Re-export the hooks to prevent circular dependencies
import { toast as sonnerToast } from "sonner";
import { useToast } from "@/hooks/use-toast";

export { useToast, sonnerToast as toast };
