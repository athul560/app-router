"use client";

import { useState } from "react";
import { useWellness } from "@/context/wellnessContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import ChartCard from "@/components/ui/ChartCard";
import { EXERCISE_TYPES } from "@/lib/constants";
import type { Exercise } from "@/types/wellness";

export default function ExercisePage() {
  const { exercises, addExercise } = useWellness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    caloriesBurned: "",
    type: "cardio" as Exercise["type"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const exercise: Exercise = {
      id: Date.now().toString(),
      name: formData.name,
      duration: parseInt(formData.duration),
      caloriesBurned: parseInt(formData.caloriesBurned),
      type: formData.type,
      date: new Date().toISOString().split("T")[0],
    };
    addExercise(exercise);
    setFormData({ name: "", duration: "", caloriesBurned: "", type: "cardio" });
    setIsModalOpen(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const todayExercises = exercises.filter((e) => e.date === today);
  const totalDuration = todayExercises.reduce((sum, e) => sum + e.duration, 0);
  const totalCalories = todayExercises.reduce((sum, e) => sum + e.caloriesBurned, 0);

  // Weekly chart data
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayExercises = exercises.filter((e) => e.date === dateStr);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      duration: dayExercises.reduce((sum, e) => sum + e.duration, 0),
      calories: dayExercises.reduce((sum, e) => sum + e.caloriesBurned, 0),
    };
  });

  // Workout plans
  const workoutPlans = [
    {
      name: "Beginner Full Body",
      duration: "30 min",
      exercises: ["Push-ups", "Squats", "Plank", "Lunges"],
      difficulty: "Beginner",
    },
    {
      name: "Cardio Blast",
      duration: "45 min",
      exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers", "High Knees"],
      difficulty: "Intermediate",
    },
    {
      name: "Strength Training",
      duration: "60 min",
      exercises: ["Deadlifts", "Bench Press", "Pull-ups", "Shoulder Press"],
      difficulty: "Advanced",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Exercise & Fitness 💪
          </h1>
          <p className="text-foreground/60">Track your workouts and stay active</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Log Exercise</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Today&apos;s Duration</p>
          <p className="text-4xl font-bold text-primary-teal">{totalDuration} min</p>
        </Card>
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Calories Burned</p>
          <p className="text-4xl font-bold text-primary-blue">{totalCalories}</p>
        </Card>
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Workouts This Week</p>
          <p className="text-4xl font-bold text-primary-purple">{exercises.length}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Weekly Duration (minutes)"
          data={weeklyData}
          dataKey="duration"
          xAxisKey="day"
          type="bar"
          color="#00ffd5"
        />
        <ChartCard
          title="Weekly Calories Burned"
          data={weeklyData}
          dataKey="calories"
          xAxisKey="day"
          type="area"
          color="#007aff"
        />
      </div>

      {/* Workout Plans */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Recommended Workout Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workoutPlans.map((plan) => (
            <Card key={plan.name} variant="gradient" className="hover:scale-105 transition-transform">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h4>
                <div className="flex items-center gap-4 text-sm text-foreground/60">
                  <span>⏱️ {plan.duration}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      plan.difficulty === "Beginner"
                        ? "bg-green-500/20 text-green-400"
                        : plan.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {plan.difficulty}
                  </span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {plan.exercises.map((exercise, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="text-primary-teal">✓</span>
                    {exercise}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Start Workout
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Exercise Types */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Exercise Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EXERCISE_TYPES.map((type) => (
            <div
              key={type.value}
              className="p-6 bg-dark-200 rounded-lg text-center hover:bg-dark-300 transition-all hover:scale-105 cursor-pointer"
            >
              <span className="text-4xl block mb-2">{type.icon}</span>
              <p className="font-medium text-foreground">{type.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Today's Exercises */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Today&apos;s Exercises</h3>
        {todayExercises.length === 0 ? (
          <p className="text-center text-foreground/50 py-8">No exercises logged today</p>
        ) : (
          <div className="space-y-3">
            {todayExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 bg-dark-200 rounded-lg hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">
                    {EXERCISE_TYPES.find((t) => t.value === exercise.type)?.icon || "💪"}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{exercise.name}</p>
                    <p className="text-sm text-foreground/60 capitalize">{exercise.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-teal">{exercise.duration} min</p>
                  <p className="text-sm text-foreground/60">{exercise.caloriesBurned} cal</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Fitness Tips */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Fitness Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "🔥", tip: "Warm up for 5-10 minutes before exercising" },
            { icon: "💧", tip: "Stay hydrated during and after workouts" },
            { icon: "🎯", tip: "Set realistic and achievable fitness goals" },
            { icon: "😴", tip: "Allow adequate rest between intense workouts" },
            { icon: "🥗", tip: "Fuel your body with proper nutrition" },
            { icon: "📈", tip: "Track your progress to stay motivated" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-dark-200 rounded-lg">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm text-foreground/80">{item.tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Log Exercise Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Exercise">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Exercise Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Running, Swimming"
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Exercise Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Exercise["type"] })}
              className="w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-teal"
            >
              {EXERCISE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="30"
              required
            />
            <Input
              label="Calories Burned"
              type="number"
              value={formData.caloriesBurned}
              onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
              placeholder="200"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Log Exercise
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
