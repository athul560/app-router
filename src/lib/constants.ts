export const THEME_COLORS = {
  background: "#0a0a0a",
  foreground: "#ededed",
  primary: {
    teal: "#00ffd5",
    blue: "#007aff",
    purple: "#a855f7",
  },
  dark: {
    100: "#1a1a1a",
    200: "#2a2a2a",
    300: "#3a3a3a",
  },
};

export const MOTIVATIONAL_QUOTES = [
  "Your health is an investment, not an expense.",
  "Take care of your body. It's the only place you have to live.",
  "Small steps every day lead to big changes.",
  "Progress, not perfection.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Health is wealth. Invest wisely.",
  "Every workout is progress. Every healthy meal is progress.",
  "Believe in yourself and all that you are.",
];

export const BMI_CATEGORIES = {
  underweight: { min: 0, max: 18.5, color: "#007aff", label: "Underweight" },
  normal: { min: 18.5, max: 24.9, color: "#00ffd5", label: "Normal Weight" },
  overweight: { min: 25, max: 29.9, color: "#a855f7", label: "Overweight" },
  obese: { min: 30, max: 100, color: "#ff4444", label: "Obese" },
};

export const BLOOD_SUGAR_RANGES = {
  fasting: { normal: { min: 70, max: 100 }, prediabetes: { min: 100, max: 125 }, diabetes: { min: 126, max: 400 } },
  after_meal: { normal: { min: 70, max: 140 }, prediabetes: { min: 140, max: 199 }, diabetes: { min: 200, max: 400 } },
  random: { normal: { min: 70, max: 140 }, prediabetes: { min: 140, max: 199 }, diabetes: { min: 200, max: 400 } },
};

export const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"] as const;

export const EXERCISE_TYPES = [
  { value: "cardio", label: "Cardio", icon: "🏃" },
  { value: "strength", label: "Strength", icon: "💪" },
  { value: "flexibility", label: "Flexibility", icon: "🧘" },
  { value: "balance", label: "Balance", icon: "⚖️" },
];

export const DOCTOR_SPECIALTIES = [
  "Endocrinologist",
  "General Physician",
  "Nutritionist",
  "Diabetes Educator",
  "Cardiologist",
  "Ophthalmologist",
];

export const NEARBY_FACILITY_TYPES = [
  { type: "gym", label: "Gyms", icon: "🏋️" },
  { type: "hospital", label: "Hospitals", icon: "🏥" },
  { type: "pharmacy", label: "Pharmacies", icon: "💊" },
];
