"use client"
import { useFoodCounterSSE } from '@/hooks/use-sse';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from './ui/badge';





export default function FoodCountersList() {
  const { foodCounters, loading, error } = useFoodCounterSSE()

  // Calculate original price (since we only have the discounted price)
  const calculateOriginalPrice = (discountedPrice: number) => {
    return discountedPrice * 2
  }


  if (loading) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error)
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <p className="font-medium">Error: Please refresh the page</p>
      </div>
    )

  return (
    <div className="space-y-4">


      {foodCounters && foodCounters.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {foodCounters
            .filter((counter) => counter && counter.items)
            .map((counter, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-4 pb-2 space-y-1">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold">{counter.name}</CardTitle>
                    <Badge variant="destructive" className="bg-red-500">
                      50% OFF
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{counter.description}</p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm mb-3">
                    <span className="font-semibold">Stock:</span> {counter.stock}
                  </p>

                  <h3 className="font-semibold text-sm mb-2">Menu Items:</h3>
                  <ul className="space-y-2 text-sm">
                    {Object.entries(counter.items).map(([key, item]) => {
                      const originalPrice = calculateOriginalPrice(item.price)
                      return (
                        <li key={key} className="flex flex-col border-b pb-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">
                              <s>Rp. {originalPrice.toFixed(2)}</s>
                            </span>
                            <span className="font-bold text-red-600">Rp. {item.price.toFixed(2)}</span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No food counters found matching your search.</p>
        </div>
      )}
    </div>
  )
}


