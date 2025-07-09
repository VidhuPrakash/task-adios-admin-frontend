"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveLine, LineSeries } from "@nivo/line";

const MyLine = ({ data }: { data: LineSeries[] }) => (
  <ResponsiveLine /* or Line for fixed dimensions */
    data={data}
    margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    curve="basis"
    axisBottom={{ legendOffset: 36 }}
    axisLeft={{ tickValues: 5 }}
    enableGridX={false}
    colors={{ scheme: "red_purple" }}
    lineWidth={3}
    pointSize={0}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "seriesColor" }}
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
  />
);

const CompaniesLineChart = () => {
  const companyData = [
    {
      id: "2021",
      data: [
        { x: "Jan", y: 85 },
        { x: "Feb", y: 92 },
        { x: "Mar", y: 110 },
        { x: "Apr", y: 125 },
        { x: "May", y: 101 },
        { x: "Jun", y: 98 },
        { x: "Jul", y: 120 },
        { x: "Aug", y: 130 },
        { x: "Sep", y: 115 },
        { x: "Oct", y: 140 },
        { x: "Nov", y: 135 },
        { x: "Dec", y: 160 },
      ],
    },
    {
      id: "2022",
      data: [
        { x: "Jan", y: 95 },
        { x: "Feb", y: 105 },
        { x: "Mar", y: 125 },
        { x: "Apr", y: 138 },
        { x: "May", y: 112 },
        { x: "Jun", y: 107 },
        { x: "Jul", y: 122 },
        { x: "Aug", y: 145 },
        { x: "Sep", y: 133 },
        { x: "Oct", y: 150 },
        { x: "Nov", y: 142 },
        { x: "Dec", y: 170 },
      ],
    },
    {
      id: "2023",
      data: [
        { x: "Jan", y: 108 },
        { x: "Feb", y: 111 },
        { x: "Mar", y: 137 },
        { x: "Apr", y: 150 },
        { x: "May", y: 126 },
        { x: "Jun", y: 115 },
        { x: "Jul", y: 140 },
        { x: "Aug", y: 152 },
        { x: "Sep", y: 141 },
        { x: "Oct", y: 168 },
        { x: "Nov", y: 160 },
        { x: "Dec", y: 185 },
      ],
    },
    {
      id: "2024",
      data: [
        { x: "Jan", y: 115 },
        { x: "Feb", y: 123 },
        { x: "Mar", y: 148 },
        { x: "Apr", y: 160 },
        { x: "May", y: 138 },
        { x: "Jun", y: 122 },
        { x: "Jul", y: 144 },
        { x: "Aug", y: 159 },
        { x: "Sep", y: 150 },
        { x: "Oct", y: 172 },
        { x: "Nov", y: 168 },
        { x: "Dec", y: 190 },
      ],
    },
    {
      id: "2025",
      data: [
        { x: "Jan", y: 130 },
        { x: "Feb", y: 142 },
        { x: "Mar", y: 160 },
        { x: "Apr", y: 175 },
        { x: "May", y: 155 },
        { x: "Jun", y: 140 },
        { x: "Jul", y: 165 },
        { x: "Aug", y: 178 },
        { x: "Sep", y: 170 },
        { x: "Oct", y: 190 },
        { x: "Nov", y: 185 },
        { x: "Dec", y: 210 },
      ],
    },
  ];

  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>New Companies</CardTitle>
        <CardDescription>
          Growth chart analysis of new companies
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 h-[350px]">
        <MyLine data={companyData} />
      </CardContent>
    </Card>
  );
};

export default CompaniesLineChart;
