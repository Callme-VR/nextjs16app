import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from "../commoncomponents/section-header";
import { Button } from "../ui/button";
import Link from "next/link";

const FeatureProduct = [
  {
    id: 1,
    name: "Premium Headphones",
    Description: "High-quality sound with noise cancellation",
    tag: ["Ai", "Sassy_Frass", "Global"],
    votes:656,
    isFeatured:true
  },
  {
    id: 2,
    name: "Wireless Mouse",
    Description: "Ergonomic design with precise tracking",
    
  },
  {
    id: 4,
    name: "Smart Watch",
    Description: "Fitness tracking and smart notifications",
  },
];

export default function FeaturesCard() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <SectionHeader
            title="Featured Todays"
            icon={StarIcon}
            description="Top picks from our community this week"
          />

          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href={"/explore"}>
              View All
              <ArrowUpRightIcon className="size-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        </div>
      </div>
    </section>
  );
}
