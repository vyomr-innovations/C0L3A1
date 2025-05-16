"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"; // ✅ YAxis import

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
  result: {
    label: "Result",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function MyResultChart() {
  const { dataArray } = useInventory();

  const chartData = dataArray.map((item, index) => ({
    month: `Day ${index + 1}`,
    result: item.remainigInventory,
  }));

  return (
    <Card className="bg-[#ffffff] text-black shadow-xl shadow-black">
      <CardHeader>
        <CardTitle>Inventory Analysis</CardTitle>
        <CardDescription>Last {dataArray.length} Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, left: 0, right: 10, bottom: 0 }}
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
              dataKey="result"
              type="linear"
              stroke="#155dfd"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
