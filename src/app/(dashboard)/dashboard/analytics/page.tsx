import { AnalyticsCharts } from "@/components/features/AnalyticsCharts";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-muted-foreground">Charts and reports</p>
      </div>
      <AnalyticsCharts />
    </div>
  );
}
