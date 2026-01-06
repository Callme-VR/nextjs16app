import { LucideIcon } from "lucide-react";

export default function EmptyCard({
  message,
  icon: Icon,
}: {
  message: string;
  icon: LucideIcon;
}) {
  return (
    <div className="empty-state">
      {Icon && <Icon className="size-16 text-muted-foreground mx-auto mb-5" />}
      <p className="text-center text-4xl text-muted-foreground">{message}</p>
    </div>
  );
}
