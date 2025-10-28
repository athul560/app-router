"use client";

import { useState } from "react";
import { useWellness } from "@/context/wellnessContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import ChartCard from "@/components/ui/ChartCard";
import { MEAL_TYPES } from "@/lib/constants";
import type { CalorieEntry } from "@/types/wellness";

export default function CaloriesPage() {
  const { userProfile, calorieEntries, addCalorieEntry, removeCalorieEntry } = useWellness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    foodName: "",
    calories: "",
    mealType: "breakfast" as CalorieEntry["mealType"],
    protein: "",
    carbs: "",
    fat: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const todayEntries = calorieEntries.filter((e) => e.date === today);
  const totalCalories = todayEntries.reduce((sum, e) => sum + e.calories, 0);
  const calorieGoal = userProfile?.calorieGoal || 2000;
  const remaining = calorieGoal - totalCalories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: CalorieEntry = {
      id: Date.now().toString(),
      date: today,
      mealType: formData.mealType,
      foodName: formData.foodName,
      calories: parseInt(formData.calories),
      protein: formData.protein ? parseInt(formData.protein) : undefined,
      carbs: formData.carbs ? parseInt(formData.carbs) : undefined,
      fat: formData.fat ? parseInt(formData.fat) : undefined,
    };
    addCalorieEntry(entry);
    setFormData({
      foodName: "",
      calories: "",
      mealType: "breakfast",
      protein: "",
      carbs: "",
      fat: "",
    });
    setIsModalOpen(false);
  };

  // Weekly chart data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayCalories = calorieEntries
      .filter((e) => e.date === dateStr)
      .reduce((sum, e) => sum + e.calories, 0);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      calories: dayCalories,
    };
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Calorie Tracker 🍎
          </h1>
          <p className="text-foreground/60">Track your daily nutrition and meals</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Meal</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Consumed Today</p>
          <p className="text-4xl font-bold text-primary-teal">{totalCalories}</p>
          <p className="text-xs text-foreground/50 mt-1">calories</p>
        </Card>
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Daily Goal</p>
          <p className="text-4xl font-bold text-primary-blue">{calorieGoal}</p>
          <p className="text-xs text-foreground/50 mt-1">calories</p>
        </Card>
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Remaining</p>
          <p className={`text-4xl font-bold ${remaining >= 0 ? "text-primary-purple" : "text-red-400"}`}>
            {Math.abs(remaining)}
          </p>
          <p className="text-xs text-foreground/50 mt-1">
            {remaining >= 0 ? "calories left" : "over goal"}
          </p>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card variant="glass">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Daily Progress</span>
          <span className="text-sm text-primary-teal">{Math.round((totalCalories / calorieGoal) * 100)}%</span>
        </div>
        <div className="w-full bg-dark-300 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-teal to-primary-blue h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
          />
        </div>
      </Card>

      {/* Weekly Chart */}
      <ChartCard
        title="Weekly Calorie Intake"
        data={weeklyData}
        dataKey="calories"
        xAxisKey="day"
        type="bar"
        color="#00ffd5"
      />

      {/* Today's Meals */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Today&apos;s Meals</h3>
        {todayEntries.length === 0 ? (
          <p className="text-center text-foreground/50 py-8">No meals logged yet today</p>
        ) : (
          <div className="space-y-3">
            {todayEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-dark-200 rounded-lg hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {entry.mealType === "breakfast" ? "🌅" : entry.mealType === "lunch" ? "☀️" : entry.mealType === "dinner" ? "🌙" : "🍪"}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{entry.foodName}</p>
                    <p className="text-sm text-foreground/60 capitalize">{entry.mealType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-primary-teal">{entry.calories} cal</span>
                  <button
                    onClick={() => removeCalorieEntry(entry.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add Meal Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Meal">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Food Name"
            value={formData.foodName}
            onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
            placeholder="e.g., Grilled Chicken Salad"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Calories"
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              placeholder="250"
              required
            />
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Meal Type</label>
              <select
                value={formData.mealType}
                onChange={(e) => setFormData({ ...formData, mealType: e.target.value as CalorieEntry["mealType"] })}
                className="w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-teal"
              >
                {MEAL_TYPES.map((type) => (
                  <option key={type} value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Protein (g)"
              type="number"
              value={formData.protein}
              onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
              placeholder="20"
            />
            <Input
              label="Carbs (g)"
              type="number"
              value={formData.carbs}
              onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
              placeholder="30"
            />
            <Input
              label="Fat (g)"
              type="number"
              value={formData.fat}
              onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
              placeholder="10"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Add Meal</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
