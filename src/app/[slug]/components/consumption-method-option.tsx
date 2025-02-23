import { OrderConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: OrderConsumptionMethod;
  slug: string;
}

const ConsumptionMethodOption = ({ imageUrl, imageAlt, buttonText, option, slug }: ConsumptionMethodOptionProps) => {
  return (
    <Card className="hover:bg-gray-100 transition-all">
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
          />
        </div>
        <Button
          variant="secondary"
          className="rounded-full"
          asChild
        >
          <Link href={`${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default ConsumptionMethodOption;