"use cache";
import SectionHeader from "@/components/commoncomponents/section-header";
import VotingButtons from "@/components/form/voting-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GetFeatureProduct,
  getProductBySlug,
} from "@/lib/products/product-select";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ExternalLinkIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

export const generateStaticParams = async () => {
  const products = await GetFeatureProduct();
  return products.map((product) => ({
    slug: product.slug.toString(),
  }));
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <h1>Product not found</h1>
      </div>
    );
  }

  const { name, tagline, websiteUrl, tags, voteCount } = product;

  return (
    <div className="py-17">
      <div className="wrapper">
        <Link
          href="/"
          className="inline-flex items-center gap-2 hover:scale-110 transition-transform"
        >
          <ArrowLeftIcon className="size-4" />
          Back to products
        </Link>

        {/* product details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-13 mt-3">
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-start gap-5">
              {/* this div for the header section */}
              <div className="flex-1 min-w-0">
                <SectionHeader
                  title={product.name}
                  icon={StarIcon}
                  description={tagline ?? ""}
                />
              </div>
              {/* this one is for t tags */}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <Badge key={tag} variant={"secondary"}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          {/* for the about section */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="font-semibold mb-4 text-xl">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* for the productDetailed Card */}

          <div className="border rounded-lg p-6 bg-primary/10">
            <h2 className="text-lg font-semibold mb-4">Product Details</h2>

            <div className="space-y-2">
              {[
                {
                  label: "Launched:",
                  value: new Date(
                    product.createdAt?.toISOString() || ""
                  ).toLocaleDateString(),
                  icon: CalendarIcon,
                },
                {
                  label: "Submitted by:",
                  value: product.submittedBy,
                  icon: UserIcon,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-sm"
                >
                  <item.icon className="size-4 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* for the reviews section */}

        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">
            <div className="border rounded-lg p-6 bg-background">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-3">
                  Support These Products
                </p>
                <VotingButtons productId={product.id.toString()} voteCount={voteCount} />
                {voteCount > 100 && (
                  <div className="pt-6 border-t">
                    <Badge
                      className="w-full justify-center py-2"
                      variant="default"
                    >
                      Featured Product
                    </Badge>
                  </div>
                )}
              </div>
              {websiteUrl && (
                <Button asChild className="w-full rounded-lg" variant="outline">
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website <ExternalLinkIcon className=" size-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
