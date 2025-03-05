"use client"

import { useState } from 'react';
import { useFoodCounterSSE } from '@/hooks/use-sse';
import { Skeleton } from './ui/skeleton';
import { Card, CardHeader } from "./ui/card"
import { Badge } from './ui/badge';
import { ChevronUp, ChevronDown, Package, Soup } from 'lucide-react';





export default function FoodCountersList() {
  const { foodCounters, loading, error } = useFoodCounterSSE()
  const [expandedCounters, setExpandedCounters] = useState<string[]>([])



  // Format price in IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  function getRealPrice(priceAfterDiscount: number): string {
    const maxDiscount = 10000;
    const discountPercent = 0.5;

    const x = priceAfterDiscount + maxDiscount;

    const result =
      x * discountPercent > maxDiscount
        ? x
        : priceAfterDiscount / discountPercent;

    return formatPrice(result);
  }

  const toggleCounter = (counterId: string) => {
    setExpandedCounters((prev) =>
      prev.includes(counterId) ? prev.filter((id) => id !== counterId) : [...prev, counterId],
    )
  }



  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="overflow-hidden bg-orange-100 rounded-xl m-3">
            <CardHeader className="p-4">
              <div className="flex items-center">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-6 rounded-md bg-orange-400 ml-2" />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );

  }

  if (error)
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <p className="font-medium">Error: Please refresh the page</p>
      </div>
    )

  return (
    <>
      {/* Food Menu - Mobile Optimized */}
      <div className="px-4 pb-16">

        <div className="space-y-6">
          {foodCounters && foodCounters.filter((counter) => counter && counter.items).map((counter) => (
            <section
              key={counter.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-200"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer bg-orange-100"
                onClick={() => toggleCounter(counter.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-orange-900">{counter.name}</h2>
                    <Badge className="bg-orange-600 hover:bg-orange-700 text-white">
                      50% Diskon
                    </Badge>
                    <div
                      className={`flex items-center text-xs px-2 py-1 rounded-full ${counter.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      <Package className="h-3 w-3 mr-1" />
                      {counter.stock > 0 ? `Stock: ${counter.stock}` : "Out of stock"}
                    </div>
                  </div>
                  <p className="text-orange-700 text-sm mt-1">{counter.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {expandedCounters.includes(counter.id) ? (
                    <ChevronUp className="h-5 w-5 text-orange-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-orange-600" />
                  )}
                </div>
              </div>

              {expandedCounters.includes(counter.id) && (
                <div className="px-4 pb-4 space-y-4 pt-2">
                  {Object.entries(counter.items).map(([key, item]) => (
                    <div
                      key={key}
                      className={`flex gap-3 items-center border border-orange-200 rounded-lg p-2 active:bg-orange-50 touch-manipulation `}
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        {/* Image Placeholder */}
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-orange-100">
                          <Soup className="w-10 h-10 text-orange-600" />
                        </div>
                        <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs px-1 py-0.5 rounded-bl-md font-medium">
                          50%
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-orange-900 text-base">{item.name}</h3>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 line-through">
                              {getRealPrice(item.price)}
                            </span>
                            <span className="font-bold text-orange-600">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );


}


