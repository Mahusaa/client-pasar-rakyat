import { FoodItem } from "@/types/food-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pizza } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FoodItemCardProps {
  item: FoodItem
}

export function FoodItemCard({ item }: FoodItemCardProps) {
  // Convert USD to IDR (approximate rate: 1 USD = 15,500 IDR)
  const priceInIDR = item.price * 15500
  const discountedPriceInIDR = priceInIDR * 0.5

  // Format currency
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="overflow-hidden border-orange-200 hover:border-orange-300 transition-all h-full flex flex-col">
      <div className="relative h-24 sm:h-28 md:h-32 w-full">

        <div className="h-full w-full bg-orange-100 flex items-center justify-center">
          <Pizza className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500" />
        </div>
        <Badge variant="destructive" className="absolute top-2 right-2">
          50% Diskon
        </Badge>
      </div>
      <CardHeader className="pb-1 pt-2 px-3 sm:px-4">
        <CardTitle className="text-sm sm:text-base text-orange-700 line-clamp-2">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-3 px-3 sm:px-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-sm line-through text-muted-foreground">{formatIDR(priceInIDR)}</span>
          <span className="font-medium text-orange-600 text-sm sm:text-base">{formatIDR(discountedPriceInIDR)}</span>
        </div>
      </CardContent>
    </Card>
  )
}


