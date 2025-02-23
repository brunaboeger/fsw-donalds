// import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  // const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="relative flex h-screen flex-col items-center px-6 pt-24">
      {/* BOTÃO DE VOLTAR */}
      <div className="absolute top-4 left-4">
        <Button className="rounded-full" size="icon" asChild>
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>
      </div>

      {/* LOGO E TÍTULO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      {/* BOAS VINDAS */}
      <div className="space-y-2 pt-16 text-center">
        <h3 className="text-2xl font-semibold">Boas vindas!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      {/* CONSUMAÇÃO */}
      <div className="grid grid-cols-2 pt-14 gap-4">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          imageUrl="/takeaway.png"
          imageAlt="Para levar"
          buttonText="Para levar"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
