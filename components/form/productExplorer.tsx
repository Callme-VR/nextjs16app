import { ClockIcon, TrendingUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ProductExplorer() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Input />
        </div>

        <div className="flex gap-2">
          <Button>
            <TrendingUpIcon className="size-4" />
            Trending
          </Button>
          <Button>
            <ClockIcon className="size-4" />
            Recents
          </Button>
        </div>
      </div>
    </div>
  );
}
