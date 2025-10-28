"use client";

import { useWellness } from "@/context/wellnessContext";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import Card from "@/components/ui/Card";
import { getRandomQuote } from "@/lib/utils";
import { MOTIVATIONAL_QUOTES } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { userProfile, calorieEntries, stepData, bloodSugarReadings } = useWellness();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getRandomQuote(MOTIVATIONAL_QUOTES));
  }, []);

  // Calculate today's stats
  const today = new Date().toISOString().split("T")[0];
  const todayCalories = calorieEntries
    .filter((e) => e.date === today)
    .reduce((sum, e) => sum + e.calories, 0);
  const todaySteps = stepData.find((s) => s.date === today)?.steps || 0;
  const latestSugar = bloodSugarReadings[bloodSugarReadings.length - 1]?.value || 0;

  // Mock chart data
  const weeklyActivity = [
    { day: "Mon", calories: 1800, steps: 8500 },
    { day: "Tue", calories: 2100, steps: 10200 },
    { day: "Wed", calories: 1950, steps: 9800 },
    { day: "Thu", calories: 2200, steps: 11500 },
    { day: "Fri", calories: 1850, steps: 8900 },
    { day: "Sat", calories: 2300, steps: 12000 },
    { day: "Sun", calories: 2000, steps: 10500 },
  ];

  const sugarTrend = [
    { time: "6 AM", value: 95 },
    { time: "9 AM", value: 120 },
    { time: "12 PM", value: 110 },
    { time: "3 PM", value: 105 },
    { time: "6 PM", value: 130 },
    { time: "9 PM", value: 115 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Welcome back, {userProfile?.name || "User"}! 👋
        </h1>
        <p className="text-foreground/60">Here&apos;s your wellness summary for today</p>
      </div>

      {/* Motivational Quote */}
      <Card variant="gradient" className="border-l-4 border-primary-teal">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <p className="text-lg font-medium text-foreground italic">&quot;{quote}&quot;</p>
            <p className="text-sm text-foreground/60 mt-2">Daily Motivation</p>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Calories Today"
          value={todayCalories}
          subtitle={`Goal: ${userProfile?.calorieGoal || 2000}`}
          icon="🍎"
          color="teal"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Steps Today"
          value={todaySteps.toLocaleString()}
          subtitle={`Goal: ${userProfile?.stepGoal || 10000}`}
          icon="👟"
          color="blue"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Blood Sugar"
          value={latestSugar ? `${latestSugar} mg/dL` : "N/A"}
          subtitle="Latest reading"
          icon="💉"
          color="purple"
        />
        <StatCard
          title="Active Days"
          value="5/7"
          subtitle="This week"
          icon="🔥"
          color="teal"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Weekly Activity"
          data={weeklyActivity}
          dataKey="steps"
          xAxisKey="day"
          type="area"
          color="#00ffd5"
        />
        <ChartCard
          title="Blood Sugar Trend"
          data={sugarTrend}
          dataKey="value"
          xAxisKey="time"
          type="line"
          color="#a855f7"
        />
      </div>

      {/* Quick Actions */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Log Meal", icon: "🍽️", href: "/calories" },
            { label: "Add Steps", icon: "👟", href: "/steps" },
            { label: "Check Sugar", icon: "💉", href: "/sugar" },
            { label: "Book Doctor", icon: "👨‍⚕️", href: "/doctor" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col items-center justify-center p-6 bg-dark-200 rounded-lg hover:bg-dark-300 transition-all duration-300 hover:scale-105"
            >
              <span className="text-4xl mb-2">{action.icon}</span>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
