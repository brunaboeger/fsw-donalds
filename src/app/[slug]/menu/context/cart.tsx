"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {  // I de Interface
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => { },
  addProduct: () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  }

  const addProduct = (product: CartProduct) => {
    /* 
      1. Verifica se o produto está no carrinho
      2. Se estiver, aumenta a quantidade
      3. Se não estiver, adiciona o produto ao carrinho
    */
    const productIsAlreadyOnCart = products.some(prevProduct => prevProduct.id === product.id);

    if (!productIsAlreadyOnCart) {
      return setProducts((prev) => [...prev, product]);
    }

    /*
      Para cada produto do carrinho, verifica se o id dele é igual ao id do produto que estamos adicionando.
      Se for igual, aumenta a quantidade do produto no carrinho.
      Se não for, não faz nada.
      prevProduct é o produto atual do carrinho.
      product é o produto que está sendo adicionado ao carrinho.
    */

    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity
          }
        }
        return prevProduct;
      })
    })
  }

  return (
    <CartContext.Provider value={{
      isOpen,
      products,
      toggleCart,
      addProduct
    }}>
      {children}
    </CartContext.Provider>
  )
};

