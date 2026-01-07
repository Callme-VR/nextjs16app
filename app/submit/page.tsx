import ProductSubmitForm from "@/components/commoncomponents/ProductSubmitForm";
import SectionHeader from "@/components/commoncomponents/section-header";
import { BookPlus } from "lucide-react";

export default function Submit() {
  return (
    <section className="py-19">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Submit a Product"
            icon={BookPlus}
            description="Submit a product to be reviewed by our team"
          />
          <div className="max-w-2xl mx-auto">
            <ProductSubmitForm />
          </div>
        </div>
      </div>
    </section>
  );
}
