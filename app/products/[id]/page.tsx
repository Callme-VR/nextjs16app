"use cache";
import { GetFeatureProduct } from "@/lib/products/product-select";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const products = await GetFeatureProduct();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await GetFeatureProduct();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-4">{product.description}</p>
      <div className="flex gap-2 mb-4">
        {product.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Votes: {product.voteCount}
        </span>
        {product.status === "approved" && (
          <span className="text-green-600 font-semibold">Approved Product</span>
        )}
      </div>
    </div>
  );
}
