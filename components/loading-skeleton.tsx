export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-md ${className}`} />
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
      <div className="space-y-4">
        <LoadingSkeleton className="h-48 w-full" />
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-2/3" />
        <div className="flex gap-2">
          <LoadingSkeleton className="h-6 w-16" />
          <LoadingSkeleton className="h-6 w-20" />
          <LoadingSkeleton className="h-6 w-14" />
        </div>
      </div>
    </div>
  )
}

export function TeamMemberSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
      <div className="text-center space-y-4">
        <LoadingSkeleton className="w-24 h-24 rounded-full mx-auto" />
        <LoadingSkeleton className="h-6 w-32 mx-auto" />
        <LoadingSkeleton className="h-4 w-24 mx-auto" />
        <div className="flex gap-1 justify-center">
          <LoadingSkeleton className="h-5 w-12" />
          <LoadingSkeleton className="h-5 w-16" />
          <LoadingSkeleton className="h-5 w-14" />
        </div>
      </div>
    </div>
  )
}
