import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@heroui/react";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="App and account settings (placeholder)"
      />
      <Card className="border border-border/50 shadow-sm">
        <CardBody className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Settings className="h-7 w-7 text-primary" />
          </div>
          <p className="text-muted-foreground">Settings panel coming soon.</p>
        </CardBody>
      </Card>
    </div>
  );
}
