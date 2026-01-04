import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, EyeIcon, RocketIcon, SparkleIcon, UserIcon } from "lucide-react";
import StatesCard from "./statesCard";

// make function for the live badge
const LiveBadge = () => {
  return (
    <Badge
      variant={"outline"}
      className="px-4 py-2 mb-8 text-sm backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping h-2 w-2 inline-flex h-full w-full rounded-full bg-primary opacity-75">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      </span>
      <span className="ml-2">
        Join thousands of creators sharing their work
      </span>
    </Badge>
  );
};


const statedata = [
  {
    icon: RocketIcon,
    value: "60+",
    label: "Projects shared"
  }, {
    icon: UserIcon,
    value: "100+",
    label: "Active creator",
    hasBorder:true
  }, {
    icon: EyeIcon,
    value: "300+",
    label: "Monthly visitors"
  }
]




export default function Herosection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-13 text-center">
          <LiveBadge />

          {/* for the h1 element */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 max-w-5xl">Share What You&apos;ve Built, Discover What&apos;s Launching</h1>

          {/* for the p element */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            A community platform for creators to showcase the apps, AI tools,
            SaaS products, and creative projects. Authentic launches, real
            builders, genuine feedback.
          </p>


          {/* div buttons  */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            {/* for the buttons elements */}
            <Button className="text-base px-7 shadow-lg" asChild size={"lg"}>
              <Link href={"/submit"}>
                <SparkleIcon className="size-4" />
                Share Thought
              </Link>
            </Button>
            <Button className="text-base px-7 shadow-lg" asChild size={"lg"} variant={"secondary"}>
              <Link href={"/explore"}>
                Explore thought

                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          {/* for the state section  and mapp through it */}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl max-full">
            {
              statedata.map((stat) => (
                <StatesCard key={stat.label}{...stat} />
              ))
            }
          </div>







        </div>
      </div>
    </section>
  );
}
