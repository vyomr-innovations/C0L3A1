"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useInventory } from "@/context/dataContext";

const chartConfig = {
  estimatedCustomers: {
    label: "Estimated Customers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MyCustomerChart() {
  const { dataArray } = useInventory();
  // Prepare data for chart
  const chartData = dataArray.map((item, index) => ({
    month: `Day ${index + 1}`,
    estimatedCustomers: item.estimCustomer,
    actualCustomers: item.actualCustomer,
  }));

  return (
    <Card className="bg-[#ffffff] text-black  shadow-xl shadow-black">
      <CardHeader>
        <CardTitle>Estimated Vs Actual Customers</CardTitle>
        <CardDescription>Last {dataArray.length} Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
       <LineChart
  accessibilityLayer
  data={chartData}
  margin={{
    top: 10,
    left: 0,
    right: 10,
    bottom: 0,
  }}
>
  <CartesianGrid vertical={false} />
  <XAxis
    dataKey="month"
    tickLine={false}
    axisLine={false}
    tickMargin={8}
  />
  <YAxis
    tickLine={true}
    axisLine={true}
    tick={{ fill: "#000", fontSize: 12 }}
    tickMargin={8}
    
  />
  <ChartTooltip
    cursor={true}
    content={<ChartTooltipContent hideLabel />}
  />
  <Line
    dataKey="estimatedCustomers"
    type="linear"
    stroke="#155dfd"
    strokeWidth={2}
    dot={true}
  />
  <Line
    dataKey="actualCustomers"
    type="linear"
    stroke="#f97316"
    strokeWidth={2}
    dot={true}
  />
</LineChart>

        </ChartContainer>
      </CardContent>
    </Card>
  );
}
