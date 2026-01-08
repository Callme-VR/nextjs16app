"use client"

import { downvoteProduct, upvoteProduct } from "@/lib/products/product-action";
import { startTransition, useOptimistic, useTransition } from "react"
import { Button } from "../ui/button";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface VotingButtonsProps {
  hasVoted: boolean;
  voteCount: number;
  productId: string;
}

export default function VotingButtons({ hasVoted, voteCount: initialVoteCount, productId }: VotingButtonsProps) {
  const [optimisticVoteCount, setOptimisticVoteCount] = useOptimistic(
    initialVoteCount,
    (currentCount, change: number) => Math.max(0, currentCount + change)
  );

  const [isPending, startTransition] = useTransition();

  const handleUpvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(optimisticVoteCount + 1);
      await upvoteProduct(productId);
    })
  }

  const handleDownvote = async () => {
    startTransition(async () => {
      setOptimisticVoteCount(optimisticVoteCount - 1);
      await downvoteProduct(productId);
    })
  }

  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0" onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}>
      <Button
        onClick={handleUpvote}
        variant="ghost"
        size="icon-sm"
        className={cn(
          "h-8 w-8 text-primary ",
          hasVoted
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-primary/10 hover:text-primary"
        )}
        disabled={isPending}
      >
        <ChevronUpIcon className="size-5" />
      </Button>
      <span className="text-sm font-semibold transition-colors text-foreground">
        {optimisticVoteCount}
      </span>
      <Button
        onClick={handleDownvote}
        variant="ghost"
        size="icon-sm"
        disabled={isPending || optimisticVoteCount === 0}
        className={cn(
          "h-8 w-8 text-primary ",
          optimisticVoteCount > 0
            ? "hover:text-destructive"
            : "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronDownIcon className="size-5" />
      </Button>
    </div>
  )
}
