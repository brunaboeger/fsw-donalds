"use client";

import { ChevronLeft, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
const NavigationHeader = () => {
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="absolute top-4 px-4 z-50 flex justify-between w-full">
      <Button
        className="rounded-full"
        variant="secondary"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeft />
      </Button>
      <Button
        className="rounded-full"
        variant="secondary"
        size="icon"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}

export default NavigationHeader;