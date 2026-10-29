import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-36" />
      </div>

      <Skeleton className="h-16 w-full rounded-xl" />

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b p-4">
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
        <div className="space-y-4 p-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="hidden h-6 w-20 sm:block" />
              <Skeleton className="hidden h-6 w-32 md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
