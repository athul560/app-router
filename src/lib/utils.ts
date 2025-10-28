import { BMI_CATEGORIES, BLOOD_SUGAR_RANGES } from "./constants";
import type { BMIData, BloodSugarReading } from "@/types/wellness";

export function calculateBMI(weight: number, height: number): BMIData {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const value = Math.round(bmi * 10) / 10;

  let category: BMIData["category"] = "normal";
  if (value < BMI_CATEGORIES.underweight.max) category = "underweight";
  else if (value >= BMI_CATEGORIES.overweight.min && value < BMI_CATEGORIES.overweight.max) category = "overweight";
  else if (value >= BMI_CATEGORIES.obese.min) category = "obese";

  return {
    value,
    category,
    date: new Date().toISOString(),
  };
}

export function getBMIAdvice(category: BMIData["category"]): string {
  const advice = {
    underweight: "Consider consulting a nutritionist to develop a healthy weight gain plan with nutrient-rich foods.",
    normal: "Great job! Maintain your healthy weight with balanced nutrition and regular physical activity.",
    overweight: "Focus on portion control, increase physical activity, and consider consulting a healthcare provider.",
    obese: "We recommend consulting with a healthcare provider to develop a comprehensive weight management plan.",
  };
  return advice[category];
}

export function analyzeBloodSugar(reading: BloodSugarReading): {
  status: "normal" | "prediabetes" | "diabetes";
  color: string;
  message: string;
} {
  const { value, mealContext } = reading;
  const ranges = BLOOD_SUGAR_RANGES[mealContext] || BLOOD_SUGAR_RANGES.random;

  if (value >= ranges.normal.min && value <= ranges.normal.max) {
    return {
      status: "normal",
      color: "#00ffd5",
      message: "Your blood sugar is in the normal range.",
    };
  } else if (value >= ranges.prediabetes.min && value <= ranges.prediabetes.max) {
    return {
      status: "prediabetes",
      color: "#a855f7",
      message: "Your blood sugar indicates prediabetes. Consult your doctor.",
    };
  } else {
    return {
      status: "diabetes",
      color: "#ff4444",
      message: "Your blood sugar is high. Please consult your healthcare provider immediately.",
    };
  }
}

export function calculateCaloriesFromSteps(steps: number, weight: number = 70): number {
  // Average: 0.04 calories per step per kg of body weight
  return Math.round(steps * 0.04 * (weight / 70));
}

export function calculateDistance(steps: number): number {
  // Average stride length: 0.762 meters
  return Math.round((steps * 0.762) / 1000 * 100) / 100; // in kilometers
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function getRandomQuote(quotes: string[]): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// LocalStorage utilities
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};
