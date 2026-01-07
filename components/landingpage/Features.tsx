import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from "../commoncomponents/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../commoncomponents/productCard";
import { GetFeatureProduct } from "@/lib/products/product-select";

export default async function FeaturesCard() {
  const FeatureProducts = await GetFeatureProduct();
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

        {/*for the cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FeatureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
