import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import ErrorState from "@/components/commons/ErrorState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import useSushiDetailQuery from "@/features/sushi/hooks/useSushiDetailQuery";

import { ROUTES } from "@/constants/routes";
import { MESSAGES } from "@/constants/messages";

import SushiDetailLoading from "./SushiDetailLoading";

function SushiDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: sushi,
    isLoading,
    isError,
    error,
    refetch,
  } = useSushiDetailQuery(id!);

  if (isLoading) {
    return <SushiDetailLoading />;
  }

  if (isError || !sushi) {
    return (
      <ErrorState
        title="Unable to load sushi data"
        error={error}
        defaultMessage="An error occurred while fetching the sushi. Please try again."
        onRetry={refetch}
      />
    );
  }

  const formattedDate = new Date(sushi.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to={`/${ROUTES.sushi}`}>
          <ArrowLeft className="mr-2 size-4" />
          {MESSAGES.buttons.back}
        </Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            {sushi.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {sushi.image && (
            <div className="w-full h-64 overflow-hidden rounded-lg border">
              <img
                src={sushi.image}
                alt={sushi.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-semibold text-lg">{sushi.type}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="font-semibold text-lg text-green-600">
                ${Number(sushi?.price)?.toFixed(2)}
              </p>
            </div>

            {sushi.type === "Nigiri" && sushi.fishType && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fish Type</p>
                <p className="font-semibold">{sushi.fishType}</p>
              </div>
            )}

            {sushi.type === "Roll" && sushi.pieces !== null && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pieces</p>
                <p className="font-semibold">{sushi.pieces} pieces</p>
              </div>
            )}

            {sushi.fish && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Fish</p>
                <p className="font-semibold">{sushi.fish}</p>
              </div>
            )}

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Created Date</p>
              <p className="font-semibold">{formattedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SushiDetail;
