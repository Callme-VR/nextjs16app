"use client";
import { SparkleIcon } from "lucide-react";
import { FormField } from "../form/form-field";
import { Button } from "../ui/button";
import { submitProduct } from "@/lib/products/product-action";

export default function ProductSubmitForm() {
  const handleSubmit = async (FormData: FormData) => {
    await submitProduct(FormData);
  };

  return (
    <form className="space-y-7" action={handleSubmit}>
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="Enter product name.."
        required
        onChange={() => {}}
      />

      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product.."
        required
        onChange={() => {}}
        helperText="URL-friendly version of your product name"
      />
      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="Enter Briefly describe your product.."
        required
        onChange={() => {}}
      />
      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Tell Us more about your product.."
        required
        textarea
      />
      <FormField
        label="Website Url"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://yourwebsite.com"
        required
        onChange={() => {}}
        helperText="Enter your product website and landing page url"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="Ai,Productivity,Startup..."
        required
        onChange={() => {}}
        helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
      />

      <Button
        className="cursor-pointer w-full hover:bg-blue-600"
        size={"lg"}
        type="submit"
      >
        <SparkleIcon className="size-4" />
        Submit Product
      </Button>
    </form>
  );
}
