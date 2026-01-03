import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Herosection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
     <div className="wrapper">
      <Badge>Join thousands of creators sharing their work</Badge>

      {/* for the h1 element */}
      <h1>Share What You&apos;ve Built, Discover What&apos;s Launching</h1>

      {/* for the p element */}
      <p>
        A community platform for creators to showcase the apps, AI tools, SaaS
        products, and creative projects. Authentic launches, real builders,
        genuine feedback.
      </p>
      {/* for the buttons elements */}
      <Button>Share Thought</Button>
      <Button>Explore Thought</Button>
     </div>
    </section>
  );
}
