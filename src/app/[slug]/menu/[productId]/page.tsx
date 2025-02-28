import Image
  from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string, productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId }, include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        }
      }
    }
  });
  const restaurant = product?.restaurant;

  if (!product || !restaurant || restaurant.slug.toUpperCase() !== slug.toUpperCase()) return notFound();

  return (
    <div className="flex flex-col h-full">
      <header className="relative w-full h-[356px] bg-slate-200 z-10">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="object-cover"
          fill
        />
      </header>
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductPage;