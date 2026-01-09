"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CheckIcon, XIcon, EyeIcon } from "lucide-react";
import { approveProduct, rejectProduct } from "@/lib/products/product-action";
import { useTransition } from "react";
import Link from "next/link";

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

export default function AdminProductCard({ product }: { product: Product }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = async () => {
    startTransition(async () => {
      await approveProduct(product.id.toString());
    });
  };

  const handleReject = async () => {
    startTransition(async () => {
      await rejectProduct(product.id.toString());
    });
  };

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription className="mt-2">
              {product.description}
            </CardDescription>
          </div>
          <div className="flex gap-2 ml-4">
            <Link href={`/products/${product.slug}`} target="_blank">
              <Button variant="outline" size="sm">
                <EyeIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Submitted by: {product.submittedBy || "Anonymous"}</span>
            <span>Created: {product.createdAt?.toLocaleDateString()}</span>
          </div>

          {product.websiteUrl && (
            <div className="text-sm">
              <span className="font-medium">Website: </span>
              <a 
                href={product.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {product.websiteUrl}
              </a>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleApprove}
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckIcon className="size-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={handleReject}
              disabled={isPending}
              variant="destructive"
            >
              <XIcon className="size-4 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
