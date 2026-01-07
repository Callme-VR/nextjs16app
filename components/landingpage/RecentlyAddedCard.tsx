import { CalendarIcon, RocketIcon } from "lucide-react";
import SectionHeader from "../commoncomponents/section-header";
import ProductCard from "../commoncomponents/productCard";
import EmptyCard from "../commoncomponents/emptycard";
import { GetRecentlyAddedProduct } from "@/lib/products/product-select";

export default async function RecentlyAddedCard() {
  const RecentlyLaunchedProduct = await GetRecentlyAddedProduct();

  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper space-x-10">
        <SectionHeader
          title="Recently Added"
          icon={RocketIcon}
          description="Recently Added Products in our platform"
        />

        {RecentlyLaunchedProduct.length === 0 ? (
          <EmptyCard message="No Products Added" icon={CalendarIcon} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RecentlyLaunchedProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
