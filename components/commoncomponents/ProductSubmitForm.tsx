"use client";
import { Loader2Icon, SparkleIcon } from "lucide-react";
import { FormField } from "../form/form-field";
import { Button } from "../ui/button";
import { submitProductAction } from "@/lib/products/product-action";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
  error: {} as Record<string, string[]>,
};

export default function Product9SubmitForm() {
  const [state, formAction, isPending] = useActionState(
    submitProductAction,
    initialState
  );


  const { error, message, success } = state as {
    success: boolean;
    message: string;
    error: Record<string, string[]> | undefined;
  };









  return (
    <form className="space-y-7" action={formAction}>
      {success && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="Enter product name.."
        required
        error={error?.name?.[0]}
      />

      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product.."
        required
        error={error?.slug?.[0]}
        helperText="URL-friendly version of your product name"
      />
      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="Enter Briefly describe your product.."
        required
        error={error?.tagline?.[0]}
      />
      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Tell Us more about your product.."
        textarea
        error={error?.description?.[0]}
      />
      <FormField
        label="Website Url"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://yourwebsite.com"
        required
        error={error?.websiteUrl?.[0]}
        helperText="Enter your product website and landing page url"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="Ai,Productivity,Startup..."
        required
        error={error?.tags?.[0]}
        helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
      />

      <Button
        className="cursor-pointer w-full hover:bg-blue-600"
        size={"lg"}
        type="submit"
      >
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <SparkleIcon className="size-4" />
        )}
        Submit Product
      </Button>
    </form>
  );
}
