import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[85%] flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="text-left mb-6">Sacola</SheetTitle>
          <div className="space-y-4">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
        </SheetHeader>
        <SheetFooter className="flex flex-col gap-6">
          <div className="flex flex-col">

          </div>
          <Button className="rounded-full">Finalizar pedido</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;