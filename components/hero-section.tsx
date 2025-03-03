"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const promos = [
  {
    id: 1,
    title: "Pasar rakyat",
    description: "Diskon semua 50%, 5 stock terbatas",
    image: "/placeholder.svg?height=400&width=1200",
    color: "bg-gradient-to-r from-orange-500 to-pink-500",
  },
  {
    id: 2,
    title: "Iklan disewakan",
    description: "",
    image: "/placeholder.svg?height=400&width=1200",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
  },
]

export function HeroSection() {
  return (
    <div className="space-y-6 mb-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {promos.map((promo) => (
            <CarouselItem key={promo.id}>
              <div className="relative h-[200px] sm:h-[300px] w-full overflow-hidden rounded-xl">
                <div className={`absolute inset-0 ${promo.color} opacity-90`} />
                <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 text-white">
                  <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{promo.title}</h2>
                  <p className="text-sm sm:text-xl opacity-90">{promo.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
    </div>
  )
}


