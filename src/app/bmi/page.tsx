"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { calculateBMI, getBMIAdvice } from "@/lib/utils";
import { BMI_CATEGORIES } from "@/lib/constants";
import type { BMIData } from "@/types/wellness";

export default function BMIPage() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "male",
  });
  const [result, setResult] = useState<BMIData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bmiData = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height));
    setResult(bmiData);
    localStorage.setItem("lastBMI", JSON.stringify(bmiData));
  };

  const getCategoryColor = (category: BMIData["category"]) => {
    return BMI_CATEGORIES[category].color;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          BMI Calculator ⚖️
        </h1>
        <p className="text-foreground/60">Calculate your Body Mass Index and get personalized advice</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <Card variant="glass">
          <h3 className="text-xl font-display font-semibold mb-6">Enter Your Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Weight (kg)"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="70"
              required
            />
            <Input
              label="Height (cm)"
              type="number"
              step="0.1"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              placeholder="170"
              required
            />
            <Input
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="25"
              required
            />
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Gender</label>
              <div className="flex gap-4">
                {["male", "female", "other"].map((gender) => (
                  <label key={gender} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-4 h-4 text-primary-teal focus:ring-primary-teal"
                    />
                    <span className="text-foreground capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">Calculate BMI</Button>
          </form>
        </Card>

        {/* Result */}
        <div className="space-y-6">
          {result ? (
            <>
              <Card variant="gradient" className="text-center">
                <p className="text-sm text-foreground/60 mb-2">Your BMI</p>
                <p
                  className="text-6xl font-bold mb-4"
                  style={{ color: getCategoryColor(result.category) }}
                >
                  {result.value}
                </p>
                <div
                  className="inline-block px-6 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${getCategoryColor(result.category)}20`,
                    color: getCategoryColor(result.category),
                  }}
                >
                  {BMI_CATEGORIES[result.category].label}
                </div>
              </Card>

              <Card variant="glass">
                <h4 className="text-lg font-semibold mb-3 text-foreground">Personalized Advice</h4>
                <p className="text-foreground/70 leading-relaxed">{getBMIAdvice(result.category)}</p>
              </Card>
            </>
          ) : (
            <Card variant="glass" className="h-full flex items-center justify-center">
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📊</span>
                <p className="text-foreground/60">Enter your details to calculate BMI</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* BMI Categories Reference */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-6">BMI Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(BMI_CATEGORIES).map(([key, category]) => (
            <div
              key={key}
              className="p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{
                borderColor: category.color,
                backgroundColor: `${category.color}10`,
              }}
            >
              <p className="text-sm text-foreground/60 mb-1">
                {category.min} - {category.max === 100 ? "+" : category.max}
              </p>
              <p className="font-semibold" style={{ color: category.color }}>
                {category.label}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Health Tips */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "🥗", title: "Balanced Diet", desc: "Eat a variety of nutritious foods" },
            { icon: "💪", title: "Regular Exercise", desc: "Aim for 150 minutes per week" },
            { icon: "💧", title: "Stay Hydrated", desc: "Drink 8 glasses of water daily" },
            { icon: "😴", title: "Quality Sleep", desc: "Get 7-9 hours of sleep each night" },
          ].map((tip) => (
            <div key={tip.title} className="flex items-start gap-3 p-4 bg-dark-200 rounded-lg">
              <span className="text-3xl">{tip.icon}</span>
              <div>
                <p className="font-medium text-foreground">{tip.title}</p>
                <p className="text-sm text-foreground/60">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
