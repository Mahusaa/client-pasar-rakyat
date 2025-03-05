import { HeroSection } from "@/components/hero-section";
import { MapDrawer } from "@/components/map-drawer";
import FoodCountersList from "@/components/food-counter-list";



export default function Page() {
  return (
    <>
      <HeroSection />
      {/*counter list and search bar*/}
      <FoodCountersList />
      <MapDrawer />
    </>
  );
}
