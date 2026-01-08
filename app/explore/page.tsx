import SectionHeader from "@/components/commoncomponents/section-header";
import ProductExplorer from "@/components/form/productExplorer";
import { CompassIcon } from "lucide-react";

export default function Explore() {
  return (
    <div className="py-20">
      <div className="wrapper">
        <SectionHeader
          title="Explore All Products"
          icon={CompassIcon}
          description="Browse And Discover Amazing Products shared by Community"
        />
        <ProductExplorer />
      </div>
    </div>
  );
}
