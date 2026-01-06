import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  tag: string[];
  description: string;
  votes: number;
  isFeatured: boolean;
};

export default function ProductCard({ product }: { product: Product }) {

     const hasVotes = product.votes > 0;




  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group card-hover hover:bg-primary-foreground/20 border-solid border-gray-400 hover:border-gray-600 transition-all duration-300 ease-in-out">
        <div className="flex">
          <div className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {product.isFeatured && (
                  <Badge variant={"destructive"}>
                    <StarIcon className="size-4" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription className="group-hover:text-primary transition-colors">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex items-center justify-between gap-2">
                {product.tag.map((tag) => (
                  <Badge variant={"destructive"} key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </div>
          
          <div className="flex flex-col items-center gap-1 shrink-0 p-4">
            <Button variant="ghost" size="icon" className={cn("h-6 w-6", { "hidden": !hasVotes })}>
              <ChevronUpIcon className="size-3 text-primary" />
            </Button>
            <span className="text-xs text-muted-foreground font-semibold">
              {product.votes}
            </span>
            <Button variant="ghost" size="icon" className={cn("h-6 w-6", { "hover:text-destructive": hasVotes, "opacity-50 cursor-not-allowed": !hasVotes })}>
              <ChevronDownIcon className="size-3 text-primary" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
