"use client"

import * as React from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import Image from "next/image"



export function MapDrawer() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg bg-white border-orange-200 hover:border-orange-400 hover:bg-orange-50"
      >
        <MapPin className="h-4 w-4 text-orange-600" />
        <span>Denah Kantek</span>
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="px-4">
            <DrawerTitle hidden>Food Court Map</DrawerTitle>
          </DrawerHeader>
          <div className="relative flex-1 px-4">
            <Image src="/denahnew.png" alt="halo" width={450} height={900} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}


