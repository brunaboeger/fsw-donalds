import { Restaurant } from "@prisma/client";
import Image from "next/image";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  return (
    <header className="flex flex-col relative h-[250px] w-full">
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
    </header>
  );
}

export default RestaurantHeader;