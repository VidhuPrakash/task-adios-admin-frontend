"use client";
import { eachDayOfInterval, format } from "date-fns";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ResponsiveTimeRange, CalendarDatum } from "@nivo/calendar";

const MyTimeRange = ({ data }: { data: CalendarDatum[] }) => (
  <ResponsiveTimeRange
    data={data}
    from="2025-01-01"
    to="2025-12-31"
    emptyColor="#eeeeee"
    margin={{ top: 60, right: 10, bottom: 10, left: 10 }}
    monthLegendOffset={14}
    dayRadius={3}
    daySpacing={1}
    dayBorderWidth={0}
    dayBorderColor="#ffffff"
    /* you can keep any other props here */
  />
);

const TasksCalendorChart = () => {
  const start = new Date("2025-01-01");
  const end = new Date("2025-12-31");

  const sampleData = eachDayOfInterval({ start, end }).map((date) => ({
    day: format(date, "yyyy-MM-dd"),
    value: Math.floor(Math.random() * 101),
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Tasks</CardTitle>
        <CardDescription>
          Chart analysis of daily tasks created of cuurent year
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 h-[160px]">
        <MyTimeRange data={sampleData} />
      </CardContent>
    </Card>
  );
};

export default TasksCalendorChart;
