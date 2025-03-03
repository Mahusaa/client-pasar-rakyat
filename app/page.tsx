import { HeroSection } from "@/components/hero-section";
import { MapDrawer } from "@/components/map-drawer";
import FoodCountersList from "@/components/food-counter-list";



export default function Page() {
  return (
    <main className="min-h-screen bg-orange-50">
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-600">
            Pasar Rakyat
          </h1>
          <span className="text-sm text-gray-600 sm:text-base">
            ini realtime, gsh refresh
          </span>
        </div>

        <HeroSection />
        {/*counter list and search bar*/}
        <FoodCountersList />
      </div>
      <MapDrawer />
    </main>
  );
}
