"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { downvoteProduct, upvoteProduct } from "@/lib/products/product-action";
import { useOptimistic, useTransition } from "react";

type Product = {
  id: number;
  name: string;
  tags: string[] | null;
  description: string | null;
  voteCount: number;
  slug: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    product.voteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change)
  );

  const [isPending, startTransition] = useTransition();

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      setOptimisticVoteCount(1);
      await upvoteProduct(product.id.toString());
    });
  };

  const handleDownvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      setOptimisticVoteCount(-1);
      await downvoteProduct(product.id.toString());
    });
  };

  const hasVotes = optimisticVoteCount > 0;




  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group card-hover hover:bg-primary-foreground/20 border-solid border-gray-400 hover:border-gray-600 transition-all duration-300 ease-in-out">
        <div className="flex">
          <div className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
              </div>
              <CardDescription className="group-hover:text-primary transition-colors">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex items-center justify-between gap-2">
                {product.tags?.map((tag: string) => (
                  <Badge variant={"destructive"} key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </div>
          
          <div className="flex flex-col items-center gap-1 shrink-0 p-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-6 w-6", { "hidden": !hasVotes })}
              onClick={handleUpvote}
              disabled={isPending}
            >
              <ChevronUpIcon className="size-3 text-primary" />
            </Button>
            <span className="text-xs text-muted-foreground font-semibold">
              {optimisticVoteCount}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-6 w-6", { "hover:text-destructive": hasVotes, "opacity-50 cursor-not-allowed": !hasVotes })}
              onClick={hasVotes ? handleDownvote : undefined}
              disabled={isPending || !hasVotes}
            >
              <ChevronDownIcon className="size-3 text-primary" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
