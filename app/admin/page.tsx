import SectionHeader from "@/components/commoncomponents/section-header";
import { currentUser } from "@clerk/nextjs/server";
import { ShieldIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminProductCard from "@/components/admin/adminProductCard";

export default async function Admin() {
  try {
    const user = await currentUser();
    
    console.log("User data:", user);
    const metadata = user?.publicMetadata;
    const isAdmin = metadata?.isAdmin ?? false;
    
    if (!isAdmin) {
      console.log("User is not admin, redirecting...");
      redirect("/");
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    redirect("/");
  }

  try {
    // Fetch pending products
    const pendingProducts = await db
      .select()
      .from(products)
      .where(eq(products.status, "pending"))
      .orderBy(products.createdAt);

    const approvedProducts = await db
      .select()
      .from(products)
      .where(eq(products.status, "approved"))
      .orderBy(products.createdAt);

    return (
      <div className="py-20">
        <div className="wrapper">
          <div className="mb-12">
            <SectionHeader
              title="Admin"
              icon={ShieldIcon}
              description="Admin panel"
            />
          </div>

          <div className="space-y-12">
            {/* Pending Products */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-orange-600">
                Pending Products ({pendingProducts.length})
              </h2>
              {pendingProducts.length === 0 ? (
                <p className="text-muted-foreground">No pending products</p>
              ) : (
                <div className="grid gap-6">
                  {pendingProducts.map((product) => (
                    <AdminProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            {/* Approved Products */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-green-600">
                Approved Products ({approvedProducts.length})
              </h2>
              {approvedProducts.length === 0 ? (
                <p className="text-muted-foreground">No approved products</p>
              ) : (
                <div className="grid gap-6">
                  {approvedProducts.map((product) => (
                    <AdminProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading admin data:", error);
    redirect("/");
  }
}
