import { Product } from "@prisma/client";
import Image
  from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { formatCurrency } from "@/helpers/format-currency";

interface ProductsProps {
  products: Product[];
}

const RestaurantProducts = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      {products.map((product) => (
        <Link
          href={`/${slug}/menu/${product.id}`}
          key={product.id}
          className="flex items-center justify-between gap-16 border-b p-5 hover:bg-gray-100 transition-all"
        >
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-500 line-clamp-2">{product.description}</p>
            </div>
            <p className="font-semibold mt-3">{formatCurrency(product.price)}</p>
          </div>
          <div className="relative min-w-20 min-h-20 bg-slate-200 rounded-xl">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-xl object-contain"
            />
          </div>
        </Link>

      ))}
    </div>
  );
}

export default RestaurantProducts;