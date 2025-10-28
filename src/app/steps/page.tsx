"use client";

import { useState } from "react";
import { useWellness } from "@/context/wellnessContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import StatCard from "@/components/ui/StatCard";
import ChartCard from "@/components/ui/ChartCard";
import { calculateCaloriesFromSteps, calculateDistance } from "@/lib/utils";
import type { StepData } from "@/types/wellness";

export default function StepsPage() {
  const { userProfile, stepData, addStepData } = useWellness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [steps, setSteps] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const todayData = stepData.find((s) => s.date === today);
  const todaySteps = todayData?.steps || 0;
  const todayDistance = todayData?.distance || 0;
  const todayCalories = todayData?.caloriesBurned || 0;
  const stepGoal = userProfile?.stepGoal || 10000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stepsNum = parseInt(steps);
    const data: StepData = {
      date: today,
      steps: stepsNum,
      distance: calculateDistance(stepsNum),
      caloriesBurned: calculateCaloriesFromSteps(stepsNum, userProfile?.weight),
    };
    addStepData(data);
    setSteps("");
    setIsModalOpen(false);
  };

  // Weekly chart data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayData = stepData.find((s) => s.date === dateStr);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      steps: dayData?.steps || 0,
    };
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Step Tracker 👟
          </h1>
          <p className="text-foreground/60">Track your daily steps and activity</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Steps</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Steps Today"
          value={todaySteps.toLocaleString()}
          subtitle={`Goal: ${stepGoal.toLocaleString()}`}
          icon="👟"
          color="teal"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Distance"
          value={`${todayDistance} km`}
          subtitle="Today's distance"
          icon="🗺️"
          color="blue"
        />
        <StatCard
          title="Calories Burned"
          value={todayCalories}
          subtitle="From walking"
          icon="🔥"
          color="purple"
        />
      </div>

      {/* Progress Circle */}
      <Card variant="gradient" className="text-center">
        <h3 className="text-xl font-display font-semibold mb-6">Daily Goal Progress</h3>
        <div className="flex items-center justify-center gap-12">
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#2a2a2a"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#00ffd5"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - Math.min(todaySteps / stepGoal, 1))}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-primary-teal">
                {Math.round((todaySteps / stepGoal) * 100)}%
              </p>
              <p className="text-sm text-foreground/60">Complete</p>
            </div>
          </div>
          <div className="text-left space-y-4">
            <div>
              <p className="text-sm text-foreground/60">Current</p>
              <p className="text-2xl font-bold text-foreground">{todaySteps.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Goal</p>
              <p className="text-2xl font-bold text-primary-teal">{stepGoal.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Remaining</p>
              <p className="text-2xl font-bold text-primary-blue">
                {Math.max(0, stepGoal - todaySteps).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Chart */}
      <ChartCard
        title="Weekly Step Count"
        data={weeklyData}
        dataKey="steps"
        xAxisKey="day"
        type="bar"
        color="#00ffd5"
        height={300}
      />

      {/* Achievements */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🏆", label: "First 10K", unlocked: todaySteps >= 10000 },
            { icon: "🔥", label: "7 Day Streak", unlocked: false },
            { icon: "⭐", label: "50K Week", unlocked: false },
            { icon: "💎", label: "100K Month", unlocked: false },
          ].map((achievement) => (
            <div
              key={achievement.label}
              className={`p-4 rounded-lg text-center transition-all ${
                achievement.unlocked
                  ? "bg-primary-teal/20 border-2 border-primary-teal"
                  : "bg-dark-200 border-2 border-dark-300 opacity-50"
              }`}
            >
              <span className="text-4xl block mb-2">{achievement.icon}</span>
              <p className="text-sm font-medium text-foreground">{achievement.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tips */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Walking Tips</h3>
        <div className="space-y-3">
          {[
            "Take the stairs instead of the elevator",
            "Park farther away from your destination",
            "Take short walking breaks every hour",
            "Walk during phone calls",
            "Use a standing desk when possible",
          ].map((tip, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-dark-200 rounded-lg">
              <span className="text-primary-teal">✓</span>
              <p className="text-foreground/80">{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Add Steps Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Steps">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Number of Steps"
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="10000"
            required
          />
          <div className="bg-dark-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-foreground/60">Estimated:</p>
            <div className="flex justify-between">
              <span className="text-foreground">Distance:</span>
              <span className="text-primary-teal font-medium">
                {calculateDistance(parseInt(steps) || 0)} km
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Calories:</span>
              <span className="text-primary-teal font-medium">
                {calculateCaloriesFromSteps(parseInt(steps) || 0, userProfile?.weight)} cal
              </span>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Add Steps</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
