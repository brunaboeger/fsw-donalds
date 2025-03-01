"use client";

import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import ProductQuantity from "../[productId]/components/product-quantity";
import { CartProduct } from "../context/cart";

interface CartItemProps {
  product: CartProduct
}

const CartProductItem = ({ product }: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState(product.price);

  const handleQuantityChange = (quantity: number, price: number) => {
    setPrice(price);
    setQuantity(quantity);
  }
  console.log(quantity);

  return (
    <div className="flex item-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 bg-slate-200 rounded-lg">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-1 text-left">
          <p className="text-sm max-w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="font-semibold mb-1">{formatCurrency(price)}</p>
          <ProductQuantity
            productPrice={product.price}
            onQuantityChange={handleQuantityChange}
            buttonClass="w-8 h-8"
          />
        </div>
      </div>
      <div className="flex items-center">
        <Button variant="outline" size="icon">
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}

export default CartProductItem;