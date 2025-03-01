"use client";

import { Prisma } from "@prisma/client";
import { ChefHat } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../context/cart";
import ProductQuantity from "./product-quantity";

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
  const { toggleCart, addProduct } = useContext(CartContext);

  const handleQuantityChange = (newQuantity: number, newPrice: number) => {
    setQuantity(newQuantity);
    setPrice(newPrice);
  }

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity
    });
    toggleCart();
  }

  return (
    <>
      <main className="relative flex flex-auto flex-col mt-[-24px] bg-white z-10 rounded-t-3xl p-5 overflow-hidden">
        <div className="flex flex-col flex-auto overflow-hidden">
          {/* Product Info */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center">
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src={restaurant.avatarImageUrl}
                  alt={restaurant.name}
                  className="rounded-full object-contain"
                  fill
                />
              </div>
              <h4 className="text-sm text-muted-foreground">{restaurant.name}</h4>
            </div>
            <h2 className="font-semibold mt-2 text-xl">{product.name}</h2>
            <div className="mt-1 flex items-center justify-between">
              <h3 className="font-semibold text-xl">
                {formatCurrency(price)}
              </h3>

              <ProductQuantity productPrice={product.price} onQuantityChange={handleQuantityChange} />
            </div>
          </div>

          <ScrollArea className="h-full">
            {/* Product About */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Sobre</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Product Ingredients */}
            <div className="flex flex-col pb-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <ChefHat size={20} />
                Ingredientes
              </h3>
              <ul className="list-disc pl-5">
                {product.ingredients.map((ingredient) => (
                  <li className="text-muted-foreground" key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>

        </div>

        {/* Button */}
        <div className="mt-2">
          <Button
            className="w-full rounded-full"
            size="lg"
            onClick={handleAddToCart}
          >
            Adicionar à Sacola
          </Button>
        </div>
      </main>

      <CartSheet />
    </>
  );
}

export default ProductDetails;