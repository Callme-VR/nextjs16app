import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export default function StatesCard({
    icon: Icon,
    label,
    value,
    hasBorder,
}: { icon: LucideIcon, value: string, label: string, hasBorder?: boolean }) {

    return (
        <div className={cn("space-y-3", hasBorder && "border-x border-b-orange-50")}>
            <div className="flex items-center justify-center gap-3">
                <Icon className="size-5 text-primary/80" />
                <p className="text-3xl sm:text-5xl font-bold">{value}</p>
            </div>
            <p className="text-sm text-muted-foreground">
                {label}
            </p>
        </div>
    )
}