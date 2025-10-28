"use client";

import { useState } from "react";
import { useWellness } from "@/context/wellnessContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import type { Goal } from "@/types/wellness";

export default function CoachPage() {
  const { goals, addGoal, updateGoal } = useWellness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "fitness" as Goal["category"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      targetDate: formData.targetDate,
      progress: 0,
      category: formData.category,
    };
    addGoal(goal);
    setFormData({ title: "", description: "", targetDate: "", category: "fitness" });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Coach & Mentor 🎯
          </h1>
          <p className="text-foreground/60">Collaborate with your coach and track your goals</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Goal</Button>
      </div>

      {/* Coach Profile */}
      <Card variant="gradient" className="border-l-4 border-primary-teal">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-primary-teal/20 rounded-full flex items-center justify-center text-4xl">
            👨‍🏫
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">Your Coach</h3>
            <p className="text-foreground/70 mb-4">
              Connect with a certified wellness coach for personalized guidance and support on your health journey.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                💬 Start Chat
              </Button>
              <Button variant="outline" size="sm">
                📞 Schedule Call
              </Button>
              <Button variant="outline" size="sm">
                📹 Video Session
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {["fitness", "nutrition", "weight", "health"].map((category) => {
          const categoryGoals = goals.filter((g) => g.category === category);
          const avgProgress =
            categoryGoals.length > 0
              ? Math.round(categoryGoals.reduce((sum, g) => sum + g.progress, 0) / categoryGoals.length)
              : 0;
          return (
            <Card key={category} variant="glass">
              <p className="text-sm text-foreground/60 mb-2 capitalize">{category} Goals</p>
              <p className="text-3xl font-bold text-primary-teal mb-2">{categoryGoals.length}</p>
              <div className="w-full bg-dark-300 rounded-full h-2">
                <div
                  className="bg-primary-teal h-2 rounded-full transition-all duration-500"
                  style={{ width: `${avgProgress}%` }}
                />
              </div>
              <p className="text-xs text-foreground/50 mt-2">{avgProgress}% Average Progress</p>
            </Card>
          );
        })}
      </div>

      {/* Active Goals */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Active Goals</h3>
        {goals.length === 0 ? (
          <p className="text-center text-foreground/50 py-8">No goals set yet. Create your first goal!</p>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id} variant="gradient">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{goal.title}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          goal.category === "fitness"
                            ? "bg-primary-teal/20 text-primary-teal"
                            : goal.category === "nutrition"
                            ? "bg-primary-blue/20 text-primary-blue"
                            : goal.category === "weight"
                            ? "bg-primary-purple/20 text-primary-purple"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3">{goal.description}</p>
                    <p className="text-xs text-foreground/50">Target: {goal.targetDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-teal">{goal.progress}%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-dark-300 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary-teal to-primary-blue h-3 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => updateGoal(goal.id, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-dark-300 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #00ffd5 0%, #00ffd5 ${goal.progress}%, #2a2a2a ${goal.progress}%, #2a2a2a 100%)`,
                      }}
                    />
                    <span className="text-sm text-foreground/60 w-12 text-right">{goal.progress}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Chat Interface Placeholder */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Coach Messages</h3>
        <div className="space-y-4 mb-4">
          {/* Mock messages */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
              👨‍🏫
            </div>
            <div className="flex-1 bg-dark-200 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-1">Coach Sarah</p>
              <p className="text-sm text-foreground/80">
                Great progress on your fitness goals! Keep up the excellent work. Remember to stay hydrated
                during your workouts.
              </p>
              <p className="text-xs text-foreground/50 mt-2">2 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <div className="flex-1 max-w-md bg-primary-teal/20 rounded-lg p-4">
              <p className="text-sm text-foreground/80">
                Thank you! I&apos;ve been following the workout plan you suggested. Feeling much better!
              </p>
              <p className="text-xs text-foreground/50 mt-2 text-right">1 hour ago</p>
            </div>
            <div className="w-10 h-10 bg-primary-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
              👤
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button>Send</Button>
        </div>
      </Card>

      {/* Motivation Score */}
      <Card variant="gradient" className="text-center">
        <h3 className="text-xl font-display font-semibold mb-4">Motivation Score</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="#2a2a2a" strokeWidth="10" fill="none" />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#00ffd5"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.85)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-primary-teal">85</p>
              <p className="text-sm text-foreground/60">Score</p>
            </div>
          </div>
          <div className="text-left space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-sm text-foreground/60">Streak</p>
                <p className="text-xl font-bold text-foreground">7 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-sm text-foreground/60">Goals Completed</p>
                <p className="text-xl font-bold text-foreground">12</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <p className="text-sm text-foreground/60">Active Goals</p>
                <p className="text-xl font-bold text-foreground">{goals.length}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Goal Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Goal">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Goal Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Run 5K in under 30 minutes"
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your goal..."
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Goal["category"] })}
                className="w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-teal"
              >
                <option value="fitness">Fitness</option>
                <option value="nutrition">Nutrition</option>
                <option value="weight">Weight</option>
                <option value="health">Health</option>
              </select>
            </div>
            <Input
              label="Target Date"
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Goal
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
