"use client";

import SectionHeader from "@/components/commoncomponents/section-header";
import { useUser } from "@clerk/nextjs";
import { ShieldIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminProductCard from "@/components/admin/adminProductCard";

type Product = {
  id: number;
  name: string;
  tags: string[] | null;
  description: string | null;
  voteCount: number;
  slug: string;
  createdAt: Date | null;
  submittedBy: string | null;
  websiteUrl: string | null;
};

export default function Admin() {
  const { user, isLoaded } = useUser();
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [approvedProducts, setApprovedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!isLoaded || !user) {
      redirect("/");
      return;
    }

    const metadata = user?.publicMetadata;
    const isAdmin = metadata?.isAdmin ?? false;
    
    if (!isAdmin) {
      redirect("/");
      return;
    }

    // Fetch products
    const fetchProducts = async () => {
      try {
        const [pending, approved] = await Promise.all([
          db.select().from(products).where(eq(products.status, "pending")).orderBy(products.createdAt),
          db.select().from(products).where(eq(products.status, "approved")).orderBy(products.createdAt)
        ]);
        
        setPendingProducts(pending);
        setApprovedProducts(approved);
      } catch (error) {
        console.error("Error loading admin data:", error);
      }
    };

    fetchProducts();
  }, [user, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="py-20">
        <div className="wrapper">
          <div className="text-center">
            <p>Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

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
}
