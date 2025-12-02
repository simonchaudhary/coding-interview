import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SushiSkeleton() {
  return (
    <Card className="relative">
      <CardContent>
        {/* Remove button skeleton */}
        <div className="absolute top-4 right-4">
          <Skeleton className="w-5 h-5 rounded" />
        </div>

        <div className="flex gap-4">
          {/* Image skeleton */}
          <Skeleton className="w-24 h-24 rounded flex-shrink-0" />

          <div className="flex-1 space-y-2">
            {/* Title skeleton */}
            <Skeleton className="h-7 w-3/4" />

            <div className="space-y-1 text-sm">
              {/* Type row */}
              <div className="flex justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>

              {/* Fish/Pieces row */}
              <div className="flex justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
              </div>

              {/* Price row */}
              <div className="flex justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SushiSkeleton;