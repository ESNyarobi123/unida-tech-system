import { AnalyticsCharts } from "@/components/features/AnalyticsCharts";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Charts and reports"
      />
      <AnalyticsCharts />
    </div>
  );
}
