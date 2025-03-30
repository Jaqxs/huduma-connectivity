
// Re-export the hooks to prevent circular dependencies
import { toast } from "@/components/ui/sonner";
import { useToast } from "@/hooks/use-toast";

export { useToast, toast };
