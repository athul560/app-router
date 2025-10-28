"use client";

import Card from "./Card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartCardProps {
  title: string;
  data: Record<string, string | number>[];
  dataKey: string;
  xAxisKey: string;
  type?: "line" | "area" | "bar";
  color?: string;
  height?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
}

export default function ChartCard({
  title,
  data,
  dataKey,
  xAxisKey,
  type = "line",
  color = "#00ffd5",
  height = 250,
}: ChartCardProps) {
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-200 border border-dark-300 rounded-lg p-3 shadow-lg">
          <p className="text-foreground font-medium">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 5, left: -20, bottom: 5 },
    };

    switch (type) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey={xAxisKey} stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis stroke="#666" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey={dataKey} stroke={color} fill="url(#colorGradient)" strokeWidth={2} />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey={xAxisKey} stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis stroke="#666" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey={xAxisKey} stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis stroke="#666" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} dot={{ fill: color, r: 4 }} />
          </LineChart>
        );
    }
  };

  return (
    <Card variant="glass">
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </Card>
  );
}
