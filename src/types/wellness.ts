export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: "male" | "female" | "other";
  diabetesType?: "type1" | "type2" | "prediabetes" | "none";
  calorieGoal: number;
  stepGoal: number;
  avatar?: string;
}

export interface CalorieEntry {
  id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  foodName: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface BMIData {
  value: number;
  category: "underweight" | "normal" | "overweight" | "obese";
  date: string;
}

export interface StepData {
  date: string;
  steps: number;
  distance: number;
  caloriesBurned: number;
}

export interface BloodSugarReading {
  id: string;
  date: string;
  time: string;
  value: number;
  mealContext: "fasting" | "before_meal" | "after_meal" | "random";
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  type: "cardio" | "strength" | "flexibility" | "balance";
  date: string;
}

export interface DoctorAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  category: "weight" | "fitness" | "nutrition" | "health";
}

export interface HealthMetrics {
  date: string;
  weight?: number;
  bloodPressure?: { systolic: number; diastolic: number };
  heartRate?: number;
  sleepHours?: number;
}
