"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeft, ScrollText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (<header className="flex flex-col relative h-[250px] w-full">
    <Button
      className="absolute left-4 top-4 rounded-full z-10"
      size="icon"
      variant="secondary"
      onClick={handleBackClick}
    >
      <ChevronLeft />
    </Button>
    <Image
      src={restaurant.coverImageUrl}
      alt={restaurant.name}
      fill
      className="object-cover"
    />
    <Button
      className="absolute right-4 top-4 rounded-full z-10"
      size="icon"
      variant="secondary"
    >
      <ScrollText />
    </Button>
  </header>);
}

export default RestaurantHeader;