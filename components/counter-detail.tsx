import { FoodCounter } from "@/types/food-types"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Store } from "lucide-react"
import { FoodItemCard } from "./food-item-card"

interface CounterDetailProps {
  counter: FoodCounter[];
  onBack: () => void;
  selected: number | null;
}

export function CounterDetail({ counter, onBack, selected }: CounterDetailProps) {
  const filteredCounter = selected !== null
    ? counter.filter((c) => Number(c.id) === selected)[0]
    : null;

  if (!filteredCounter) {
    return <p className="text-muted-foreground">Counter not found.</p>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-orange-700 hover:text-orange-900 hover:bg-orange-100 mb-2 sm:mb-4 -ml-2"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sm:inline">Back to all counters</span>
      </Button>

      <Card className="border-orange-200">
        <div className="relative h-48 sm:h-56 md:h-64 w-full">
          <div className="h-full w-full bg-orange-200 flex items-center justify-center">
            <Store className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-orange-600" />
          </div>
        </div>
        <CardHeader className="sm:py-4 py-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <CardTitle className="text-xl sm:text-2xl text-orange-700">{filteredCounter.name}</CardTitle>
            <Badge
              variant="outline"
              className={`w-fit ${filteredCounter.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            >
              {filteredCounter.stock > 0 ? `${filteredCounter.stock} in stock` : "Out of stock"}
            </Badge>
          </div>
          <CardDescription className="text-sm sm:text-base mt-2">
            {filteredCounter.description}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-4 sm:mt-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-orange-700">Available Items</h2>
          <Badge variant="destructive" className="uppercase">
            50% off all items
          </Badge>
        </div>

        {filteredCounter.items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredCounter.items.map((item) => (
              <FoodItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No items available at this counter.</p>
        )}
      </div>
    </div>
  );
}

