"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { format, subMonths } from "date-fns";
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"
import useAppDispatch from "@/hooks/useAppDispatch"
import { useEffect, useState } from "react"
import { getAllConsultations } from "@/store/consultations/actions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "A simple area chart"

const chartConfig = {
  consultations: {
    label: "Consultations",
    color: "#0DABCB",
  },
} satisfies ChartConfig;


export function ChartAreaConsultation() {

const dispatch = useAppDispatch();
const consultations = useAppSelector((state: RootState) => state.consultation.items);
const [timeRange, setTimeRange] = useState("90d");
const today = new Date();
const defaultEnd = format(today, "yyyy-MM");
const defaultStart = format(subMonths(today, 12), "yyyy-MM");

const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);

useEffect(() => {
    dispatch(getAllConsultations());
}, [dispatch]);

const monthlyData = consultations.reduce((acc, c) => {
  if (!c.dateHeure) return acc;
  const date = new Date(c.dateHeure);
  if (isNaN(date.getTime())) return acc;
  const monthYear = format(date, "yyyy-MM");
  acc[monthYear] = (acc[monthYear] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(monthlyData)
  .map(([monthYear, count]) => {
    const monthDate = new Date(`${monthYear}-01`);
    if (isNaN(monthDate.getTime())) return null;
    return {
      month: format(monthDate, "MMM yyyy"),
      consultations: count,
      monthDate,
    };
  })
  .filter((item): item is { month: string; consultations: number; monthDate: Date } => item !== null);

// const filteredData = chartData.filter((item) => {
//   const date = item.monthDate;
//   const referenceDate = new Date();
//   let daysToSubtract = 365;

//   if (timeRange === "12m") daysToSubtract = 365;
//   else if (timeRange === "90d") daysToSubtract = 90;
//   else if (timeRange === "30d") daysToSubtract = 30;
//   else if (timeRange === "7d") daysToSubtract = 7;

//   const startDate = new Date(referenceDate);
//   startDate.setDate(startDate.getDate() - daysToSubtract);

//   return date >= startDate;
// });

let filteredData = chartData;
  if (timeRange !== "custom") {
    const referenceDate = new Date();
    let daysToSubtract = 365;
    if (timeRange === "12m") daysToSubtract = 365;
    else if (timeRange === "90d") daysToSubtract = 90;
    else if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    filteredData = chartData.filter((item) => item.monthDate >= startDate);
  } else {
    filteredData = chartData.filter(
      (item) => item.monthDate >= new Date(startDate) && item.monthDate <= new Date(endDate)
    );
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques de consultation</CardTitle>
        <CardDescription>
          Nombre de consultations par période
        </CardDescription>
        <CardAction className="flex gap-3">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="12m">Last 12 months</ToggleGroupItem>
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            <ToggleGroupItem value="custom">Personnaliser</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="12m" className="rounded-lg">
                Last 12 months
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
              <SelectItem value="custom" className="rounded-lg">
                Personnaliser
              </SelectItem>
            </SelectContent>
          </Select>

          {timeRange === "custom" && (
            <div className="flex gap-2 text-sm items-center">
              <label className="font-medium">Début :</label>
              <input
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-2 py-1"
              />
              <label className="font-medium">Fin :</label>
              <input
                type="month"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Aucune donnée disponible pour la période sélectionnée.
          </div>
        ) : (
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="consultations"
              type="natural"
              fill="var(--color-consultations)"
              fillOpacity={0.4}
              stroke="var(--color-consultations)"
            />

          </AreaChart>
        </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
