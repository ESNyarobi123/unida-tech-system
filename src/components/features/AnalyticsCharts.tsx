"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", visits: 4000, revenue: 2400 },
  { month: "Feb", visits: 3000, revenue: 1398 },
  { month: "Mar", visits: 5000, revenue: 3800 },
  { month: "Apr", visits: 4500, revenue: 3908 },
  { month: "May", visits: 6000, revenue: 4800 },
  { month: "Jun", visits: 5500, revenue: 4300 },
];

const statusData = [
  { name: "Paid", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Pending", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Overdue", value: 25, color: "hsl(var(--destructive))" },
];

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <h3 className="mb-4 font-semibold">Visits & revenue</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line type="monotone" dataKey="visits" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-2))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <h3 className="mb-4 font-semibold">Invoices by status</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
