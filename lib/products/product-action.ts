"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-schema";
import z from "zod";
import { products } from "@/db/schema";
import { db } from "@/db/db";

type FormState = {
     success: boolean;
     message: string;
     error?: Record<string, string[]>;
}





export async function submitProductAction(prevState: FormState, formData: FormData) {
     try {
          const { userId, orgId } = await auth();
          if (!userId) {
               return { success: false, message: "User not authenticated" };
          }
          if (!orgId) {
               return { success: false, message: "Organization not found" };
          }
          const user = await currentUser();
          const userEmail = user?.emailAddresses[0]?.emailAddress || "";

          const rawData = Object.fromEntries(formData.entries());
          const validatedData = productSchema.parse(rawData);

          const tagsArray = validatedData.tags.filter(tag => tag.trim() !== "").map(tag => tag.trim());



          await db.insert(products).values({
               name: validatedData.name,
               slug: validatedData.slug,
               tagline: validatedData.tagline,
               description: validatedData.description,
               websiteUrl: validatedData.websiteUrl,
               tags: tagsArray,
               status: "pending",
               submittedBy: userEmail,
               organizationId: orgId,
               userId: userId
          });
          return { success: true, message: "Product submitted successfully" };

          // TODO: Insert validatedData into database
          console.log("Validated product data:", validatedData);

     } catch (error) {
          if (error instanceof z.ZodError) {
               return {
                    success: false,
                    message: "Validation failed",
                    error: error.flatten().fieldErrors
               };
          }

          return {
               success: false,
               message: "An unexpected error occurred"
          };
     }

}
