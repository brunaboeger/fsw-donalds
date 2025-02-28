"use client";

import { Prisma } from "@prisma/client";
import { ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true
        }
      }
    }
  }>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const restaurant = product.restaurant;
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState(product.price);

  const handleQuantity = (action: "increment" | "decrement") => {
    if (action === "increment") {
      setPrice(product.price * quantity + product.price);
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
      setPrice(product.price * quantity - product.price);
    }
  }

  return (
    <main className="relative flex flex-auto flex-col mt-[-24px] bg-white z-10 rounded-t-3xl p-5">
      <div className="flex-auto">
        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="relative w-6 h-6 mr-2">
              <Image
                src={restaurant.avatarImageUrl}
                alt={restaurant.name}
                className="rounded-full object-contain"
                fill
              />
            </div>
            <h4 className="text-sm text-gray-500">{restaurant.name}</h4>
          </div>
          <h2 className="font-semibold mt-2 text-xl">{product.name}</h2>
          <div className="mt-1 flex items-center justify-between">
            <h3 className="font-semibold text-xl">
              {formatCurrency(price)}
            </h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleQuantity("decrement")}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ChevronLeft />
              </Button>
              <p className="w-4 text-center">{quantity}</p>
              <Button
                onClick={() => handleQuantity("increment")}
                variant="destructive"
                size="icon"
                className="rounded-full"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>

        {/* Product About */}
        <div className="my-6">
          <h3 className="font-semibold mb-2">Sobre</h3>
          <p className="text-gray-500">{product.description}</p>
        </div>

        {/* Product Ingredients */}
        <div className="flex flex-col">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <ChefHat size={20} />
            Ingredientes
          </h3>
          <ul className="list-disc pl-5">
            {product.ingredients.map((ingredient) => (
              <li className="text-gray-500" key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <Button
          className="w-full rounded-full"
          size="lg"
        >
          Adicionar à Sacola
        </Button>
      </div>
    </main>
  );
}

export default ProductDetails;