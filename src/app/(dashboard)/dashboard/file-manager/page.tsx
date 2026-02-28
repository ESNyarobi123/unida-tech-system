import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardBody } from "@heroui/react";
import { FolderOpen } from "lucide-react";

export default function FileManagerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="File manager"
        description="Files & uploads (placeholder)"
      />
      <Card className="border border-border/50 shadow-sm">
        <CardBody className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <FolderOpen className="h-7 w-7 text-primary" />
          </div>
          <p className="text-muted-foreground">File manager coming soon.</p>
        </CardBody>
      </Card>
    </div>
  );
}
