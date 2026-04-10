"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"
import useAppDispatch from "@/hooks/useAppDispatch"
import { useEffect } from "react"
import { getMotifsStats } from "@/store/motifsconsultations/actions"

export function ChartBarMotifs() {
  const dispatch = useAppDispatch();
  const motifsStats = useAppSelector((state: RootState) => state.motifconsultation.stats);

  useEffect(() => {
    dispatch(getMotifsStats());
  }, [dispatch]);

  const chartData = motifsStats.map(m => ({
    motif: m.motif,
    consultations: m.count,
  }));

  const chartConfig = {
    consultations: {
      label: "Consultations",
      color: "#9616cc",
    },
    label: {
      color: "var(--background)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Motifs de consultation</CardTitle>
        <CardDescription>Statistiques de répartition des motifs</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="motif"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="consultations" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="consultations"
              layout="vertical"
              fill="var(--color-consultations)"
              radius={4}
            >
              <LabelList
                dataKey="motif"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="consultations"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
