import { Suspense } from "react";
import FeaturesCard from "@/components/landingpage/Features";
import Herosection from "@/components/landingpage/Herosection";
import RecentlyAddedCard from "@/components/landingpage/RecentlyAddedCard";
import { LoaderIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Herosection />
      <div className="space-y-20">
        <Suspense fallback={<div>Loading featured products...</div>}>
          <FeaturesCard />
        </Suspense>
        <Suspense
          fallback={
            <div className="wrapper flex justify-center items-center gap-4">
            Loading recent products...
            <LoaderIcon className="size-4 animate-spin" />
          </div>
          }
        >
          <RecentlyAddedCard />
        </Suspense>
      </div>
    </div>
  );
}
