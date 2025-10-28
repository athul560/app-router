"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  UserProfile,
  CalorieEntry,
  StepData,
  BloodSugarReading,
  Exercise,
  DoctorAppointment,
  Goal,
} from "@/types/wellness";
import { storage } from "@/lib/utils";

interface WellnessContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  calorieEntries: CalorieEntry[];
  addCalorieEntry: (entry: CalorieEntry) => void;
  removeCalorieEntry: (id: string) => void;
  stepData: StepData[];
  addStepData: (data: StepData) => void;
  bloodSugarReadings: BloodSugarReading[];
  addBloodSugarReading: (reading: BloodSugarReading) => void;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  appointments: DoctorAppointment[];
  addAppointment: (appointment: DoctorAppointment) => void;
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, progress: number) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export function WellnessProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [calorieEntries, setCalorieEntries] = useState<CalorieEntry[]>([]);
  const [stepData, setStepData] = useState<StepData[]>([]);
  const [bloodSugarReadings, setBloodSugarReadings] = useState<BloodSugarReading[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    setUserProfileState(storage.get("userProfile", null));
    setCalorieEntries(storage.get("calorieEntries", []));
    setStepData(storage.get("stepData", []));
    setBloodSugarReadings(storage.get("bloodSugarReadings", []));
    setExercises(storage.get("exercises", []));
    setAppointments(storage.get("appointments", []));
    setGoals(storage.get("goals", []));
  }, []);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    storage.set("userProfile", profile);
  };

  const addCalorieEntry = (entry: CalorieEntry) => {
    const updated = [...calorieEntries, entry];
    setCalorieEntries(updated);
    storage.set("calorieEntries", updated);
  };

  const removeCalorieEntry = (id: string) => {
    const updated = calorieEntries.filter((e) => e.id !== id);
    setCalorieEntries(updated);
    storage.set("calorieEntries", updated);
  };

  const addStepData = (data: StepData) => {
    const updated = [...stepData, data];
    setStepData(updated);
    storage.set("stepData", updated);
  };

  const addBloodSugarReading = (reading: BloodSugarReading) => {
    const updated = [...bloodSugarReadings, reading];
    setBloodSugarReadings(updated);
    storage.set("bloodSugarReadings", updated);
  };

  const addExercise = (exercise: Exercise) => {
    const updated = [...exercises, exercise];
    setExercises(updated);
    storage.set("exercises", updated);
  };

  const addAppointment = (appointment: DoctorAppointment) => {
    const updated = [...appointments, appointment];
    setAppointments(updated);
    storage.set("appointments", updated);
  };

  const addGoal = (goal: Goal) => {
    const updated = [...goals, goal];
    setGoals(updated);
    storage.set("goals", updated);
  };

  const updateGoal = (id: string, progress: number) => {
    const updated = goals.map((g) => (g.id === id ? { ...g, progress } : g));
    setGoals(updated);
    storage.set("goals", updated);
  };

  return (
    <WellnessContext.Provider
      value={{
        userProfile,
        setUserProfile,
        calorieEntries,
        addCalorieEntry,
        removeCalorieEntry,
        stepData,
        addStepData,
        bloodSugarReadings,
        addBloodSugarReading,
        exercises,
        addExercise,
        appointments,
        addAppointment,
        goals,
        addGoal,
        updateGoal,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellness() {
  const context = useContext(WellnessContext);
  if (context === undefined) {
    throw new Error("useWellness must be used within a WellnessProvider");
  }
  return context;
}
