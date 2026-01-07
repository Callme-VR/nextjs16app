import { db } from "@/db/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"


export async function GetFeatureProduct() {
     const productsData = await db.select().from(products).where(eq(products.status, "approved")).orderBy(products.voteCount)

     return productsData

}


export async function GetRecentlyAddedProduct() {
     const productsData = await GetFeatureProduct();
     const oneweekAgo=new Date();
     oneweekAgo.setDate(oneweekAgo.getDate()-7);
     return productsData.filter((product)=>product.createdAt && product.createdAt >= oneweekAgo)
     

}