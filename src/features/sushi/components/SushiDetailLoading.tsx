import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SushiDetailLoading() {
  return (
    <div className="container mx-auto space-y-6">
      <Skeleton className="h-10 w-32" />
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="w-full h-64 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SushiDetailLoading;
