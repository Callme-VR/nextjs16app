import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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



export default function Herosection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-13 text-center">
          <LiveBadge />

          {/* for the h1 element */}
          <h1 className="text">Share What You&apos;ve Built, Discover What&apos;s Launching</h1>

          {/* for the p element */}
          <p>
            A community platform for creators to showcase the apps, AI tools,
            SaaS products, and creative projects. Authentic launches, real
            builders, genuine feedback.
          </p>
          {/* for the buttons elements */}
          <Button>Share Thought</Button>
          <Button>Explore Thought</Button>
        </div>
      </div>
    </section>
  );
}
