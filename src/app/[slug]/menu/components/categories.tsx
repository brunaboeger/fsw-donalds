"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import RestaurantProducts from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: {
          products: true
        }
      }
    }
  }>;
}

// com isso aqui podemos acessar os produtos contidos dentro de menuCategories
type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true
  }
}>

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  }

  const handleCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  }

  return (
    <section className="mt-[-50px] bg-white z-10 rounded-t-3xl">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              className="rounded-xl"
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              width={45}
              height={45}
            />
            <div className="ml-3">
              <h1 className="font-semibold text-lg">{restaurant.name}</h1>
              <p className="text-sm text-muted-foreground">{restaurant.description}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="text-sm h-10"
          >
            <Star className="mr-2 w-[20px] text-yellow-500" />
            5.0
          </Badge>
        </div>
        <div className="text-green-500 flex items-center mt-4">
          <ClockIcon size={16} />
          <p className="text-sm ml-1">Aberto</p>
        </div>
      </div>
      <ScrollArea className="w-full px-5">
        <div className="flex w-max space-x-3 mb-5">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              className="rounded-full"
              variant={handleCategoryButtonVariant(category)}
              size="sm"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          )
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="ml-5 my-2 font-semibold">{selectedCategory.name}</h3>
      <RestaurantProducts products={selectedCategory.products} />
    </section>
  );
}

export default RestaurantCategories;