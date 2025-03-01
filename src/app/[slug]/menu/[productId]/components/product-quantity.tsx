import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface ProductQuantityProps {
  productPrice: number;
  onQuantityChange: (quantity: number, price: number) => void;
  buttonClass?: string;
}

const ProductQuantity = ({ productPrice, onQuantityChange, buttonClass }: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantity = (action: "increment" | "decrement") => {
    const newQuantity = action === "increment" ? quantity + 1 : quantity > 1 ? quantity - 1 : quantity;
    const newPrice = productPrice * newQuantity;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity, newPrice);
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => handleQuantity("decrement")}
        variant="outline"
        size="icon"
        className={`rounded-full ${buttonClass}`}
      >
        <ChevronLeft />
      </Button>
      <p className="w-4 text-center">{quantity}</p>
      <Button
        onClick={() => handleQuantity("increment")}
        variant="destructive"
        size="icon"
        className={`rounded-full ${buttonClass}`}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

export default ProductQuantity;