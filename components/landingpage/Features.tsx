import { ArrowUp, ArrowUpRight, ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from "../commoncomponents/section-header";
import { Button } from "../ui/button";
import Link from "next/link";

export default function FeaturesCard() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex items-center justify-center mb-8">
                    <SectionHeader title="Featured Todays" icon={StarIcon} description="Top picks from our community this week" />

                    <Button value={"outline"} asChild className="hidden sm:flex">
                        <Link href={"/explore"}>
                        </Link>
                        <ArrowUpRightIcon className="size-4"/>
                        View All
                    </Button>
                </div>
            </div>
        </section>
    )
}