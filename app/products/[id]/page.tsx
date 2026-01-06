import { notFound } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Premium Headphones",
    tag: ["Ai", "Sassy_Frass", "Global"],
    description: "Premium Headphones",
    votes: 10,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    tag: ["Ai", "Sassy_Frass", "Global"],
    description: "Wireless Mouse",
    votes: 10,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Smart Watch",
    tag: ["Ai", "Sassy_Frass", "Global"],
    description: "Smart Watch",
    votes: 10,
    isFeatured: true,
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-4">{product.description}</p>
      <div className="flex gap-2 mb-4">
        {product.tag.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            {tag}
          </span>
        ))}
      </div>
      {product.isFeatured && (
        <div className="text-green-600 font-semibold">Featured Product</div>
      )}
    </div>
  );
}
