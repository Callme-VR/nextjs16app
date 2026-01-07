import { Suspense } from "react";
import FeaturesCard from "@/components/landingpage/Features";
import Herosection from "@/components/landingpage/Herosection";
import RecentlyAddedCard from "@/components/landingpage/RecentlyAddedCard";

export default function Home() {
    return (
      <div>
        <Herosection/> 
        <Suspense fallback={<div>Loading featured products...</div>}>
          <FeaturesCard/>
        </Suspense>
        <Suspense fallback={<div>Loading recent products...</div>}>
          <RecentlyAddedCard/>
        </Suspense>
      </div>
    )
} 