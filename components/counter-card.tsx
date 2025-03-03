import Image from "next/image"
import type { FoodCounter } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store } from "lucide-react"

interface CounterCardProps {
  counter: FoodCounter
  onClick: () => void
}

export function CounterCard({ counter, onClick }: CounterCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg border-orange-200 hover:border-orange-400 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-32 sm:h-36 w-full">
        <div className="h-full w-full bg-orange-200 flex items-center justify-center">
          <Store className="h-10 w-10 text-orange-600" />
        </div>
      </div>
      <CardHeader className="pb-1 pt-2 px-3 sm:px-4 sm:pb-2 sm:pt-3">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-sm sm:text-base md:text-lg text-orange-700 line-clamp-1">{counter.name}</CardTitle>
          <Badge
            variant="outline"
            className={`text-xs w-fit ${counter.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {counter.stock > 0 ? `${counter.stock} in stock` : "Out of stock"}
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm line-clamp-2 mt-1">{counter.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-3 px-3 sm:px-4 mt-auto">
        <p className="text-xs text-muted-foreground">{counter.items.length} items</p>
      </CardContent>
    </Card>
  )
}


