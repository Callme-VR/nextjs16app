import FeaturesCard from "@/components/landingpage/Features";
import Herosection from "@/components/landingpage/Herosection";
import RecentlyAddedCard from "@/components/landingpage/RecentlyAddedCard";

export default function Home() {
    return (
      <div>
        <Herosection/>
        <FeaturesCard/>
        <RecentlyAddedCard/>
      </div>
    )
} 