"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselItems = [
  {
    id: 1,
    title: "Ramadhan Special: Diskon 50%",
    description: "Diskon spesial untuk semua menu kantek selama Pasar Rakyat.",
  },
  {
    id: 2,
    title: "Penting Untuk diingat",
    description: "Kupon dapat ditukar maksimal jam 18.30. Jika pedagang kehabisan stok, kupon bisa ditukar dengan makanan lainnya atau direimburse.",
  },
  {
    id: 3,
    title: "Dipersembahkan oleh",
    description: "Gradasi FTUI, Sekip FTUI, FUSI FTUI, ILUNI FTUI",
  },

]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }
  return (
    <div className="relative overflow-hidden mb-4">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <div className="relative h-[150px] w-full">
              <div className="absolute inset-0  bg-orange-500 flex flex-col justify-end p-4">
                <h2 className="text-white text-xl font-bold">{item.title}</h2>
                <p className="text-white text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 flex items-center justify-center"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5 text-orange-600" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/70 flex items-center justify-center"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5 text-orange-600" />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-orange-600" : "bg-white/70"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}


