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
import { getSoinsStats } from "@/store/soinsconsultations/actions"

export function ChartBarSoins() {
  const dispatch = useAppDispatch();
  const soinsStats = useAppSelector((state: RootState) => state.soinsconsultation.stats);

  useEffect(() => {
    dispatch(getSoinsStats());
  }, [dispatch]);

  const chartData = soinsStats.map(s => ({
    soin: `${s.soin} (${s.codification})`,
    consultations: s.count,
  }));

  const chartConfig = {
    consultations: {
      label: "Consultations",
      color: "#0DABCB",
    },
    label: {
      color: "var(--background)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Soins prodigués par le cabinet</CardTitle>
        <CardDescription>Statistiques de répartition des soins prodigués</CardDescription>
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
              dataKey="soin"
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
                dataKey="soin"
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
