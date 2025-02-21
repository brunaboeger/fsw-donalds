import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/prisma";

const HomePage = async () => {
  const restaurants = await db.restaurant.findMany();

  return (
    <div className="p-14 h-screen">
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-medium">Restaurantes</h1>
        <p className="text-gray-500">Encontrados: {restaurants.length}</p>
      </div>
      <div>
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="mb-4 flex items-center justify-between hover:bg-gray-100 transition-all">
            <CardContent className="flex pt-6">
              <CardHeader className="p-0 mr-6 relative w-[50px] h-[50px]">
                <Image src={restaurant.avatarImageUrl} alt={restaurant.name} className="object-contain" fill />
              </CardHeader>
              <CardContent className="flex flex-col p-0">
                <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.description}</CardDescription>
              </CardContent>
            </CardContent>
            <CardFooter className="pt-6">
              <Button asChild>
                <Link href={restaurant.slug}>
                  Acessar
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
