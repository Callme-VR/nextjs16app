import { db } from "@/db/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"


export async function GetFeatureProduct() {
     "use cache";
     const productsData = await db.select().from(products).where(eq(products.status, "approved")).orderBy(products.voteCount)

     return productsData

}


export async function GetRecentlyAddedProduct() {
     "use cache";
     const RecentlyAddedproductsData = await GetFeatureProduct();
     const oneweekAgo=new Date();
     oneweekAgo.setDate(oneweekAgo.getDate()-7);
     return RecentlyAddedproductsData.filter((product)=>product.createdAt && product.createdAt >= oneweekAgo)
     

}