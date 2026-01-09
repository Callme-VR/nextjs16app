"use client";

import { ClockIcon, SearchIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProductCard from "../commoncomponents/productCard";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  tags: string[] | null;
  description: string | null;
  voteCount: number;
  slug: string;
  createdAt: Date | null;
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "trending" | "recent">("all");

  // Filter products based on search query and filter type
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === "trending") {
      return product.voteCount > 0;
    } else if (filter === "recent") {
      // Filter products from the last 7 days
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return product.createdAt && new Date(product.createdAt) >= oneWeekAgo;
    }

    return true;
  });

  // Sort products if trending
  const displayProducts = filter === "trending" 
    ? [...filteredProducts].sort((a, b) => b.voteCount - a.voteCount)
    : filteredProducts;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex flex-col gap-4 sm:flex-row mb-8">
          <div className="relative flex-1">
            <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} disabled />
          </div>

          <div className="flex gap-2">
            <Button disabled>
              <TrendingUpIcon className="size-4" />
              Trending
            </Button>
            <Button disabled>
              <ClockIcon className="size-4" />
              Recents
            </Button>
          </div>
        </div>

        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 -translate-1.5 text-muted-foreground size-4 mr-3 " />
          <Input 
            placeholder="Search products..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === "trending" ? "default" : "outline"}
            onClick={() => setFilter("trending")}
          >
            <TrendingUpIcon className="size-4" />
            Trending
          </Button>
          <Button
            variant={filter === "recent" ? "default" : "outline"}
            onClick={() => setFilter("recent")}
          >
            <ClockIcon className="size-4" />
            Recents
          </Button>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <p className="">showing {displayProducts.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {displayProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
}
