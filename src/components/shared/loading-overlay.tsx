import { Loader2 } from "lucide-react"
import { useLoading } from "@/lib/loading-context"

export function LoadingOverlay() {
  const { loading } = useLoading()

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/50 backdrop-blur-xs">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-8 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="font-medium">Loading...</p>
      </div>
    </div>
  )
}
