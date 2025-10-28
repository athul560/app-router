"use client";

import { useState, useEffect } from "react";
import { useWellness } from "@/context/wellnessContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { UserProfile } from "@/types/wellness";

export default function ProfilePage() {
  const { userProfile, setUserProfile } = useWellness();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: "",
    age: 0,
    weight: 0,
    height: 0,
    gender: "male",
    diabetesType: "none",
    calorieGoal: 2000,
    stepGoal: 10000,
  });

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      id: userProfile?.id || Date.now().toString(),
      name: formData.name || "",
      age: formData.age || 0,
      weight: formData.weight || 0,
      height: formData.height || 0,
      gender: formData.gender || "male",
      diabetesType: formData.diabetesType,
      calorieGoal: formData.calorieGoal || 2000,
      stepGoal: formData.stepGoal || 10000,
    };
    setUserProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Profile & Settings 👤
          </h1>
          <p className="text-foreground/60">Manage your personal information and preferences</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>

      {/* Profile Card */}
      <Card variant="gradient">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-teal to-primary-blue rounded-full flex items-center justify-center text-5xl">
            👤
          </div>
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    placeholder="25"
                    required
                  />
                  <Input
                    label="Weight (kg)"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                    placeholder="70"
                    required
                  />
                  <Input
                    label="Height (cm)"
                    type="number"
                    step="0.1"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                    placeholder="170"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as UserProfile["gender"] })}
                      className="w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-teal"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Diabetes Type</label>
                    <select
                      value={formData.diabetesType}
                      onChange={(e) => setFormData({ ...formData, diabetesType: e.target.value as UserProfile["diabetesType"] })}
                      className="w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-teal"
                    >
                      <option value="none">None</option>
                      <option value="type1">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="prediabetes">Prediabetes</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">Save Changes</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {userProfile?.name || "Set up your profile"}
                </h2>
                {userProfile && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-foreground/60">Age</p>
                      <p className="text-foreground font-medium">{userProfile.age} years</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Gender</p>
                      <p className="text-foreground font-medium capitalize">{userProfile.gender}</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Weight</p>
                      <p className="text-foreground font-medium">{userProfile.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Height</p>
                      <p className="text-foreground font-medium">{userProfile.height} cm</p>
                    </div>
                    {userProfile.diabetesType && userProfile.diabetesType !== "none" && (
                      <div>
                        <p className="text-foreground/60">Diabetes Type</p>
                        <p className="text-foreground font-medium capitalize">{userProfile.diabetesType}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Goals Settings */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Daily Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Daily Calorie Goal
            </label>
            <Input
              type="number"
              value={formData.calorieGoal}
              onChange={(e) => setFormData({ ...formData, calorieGoal: parseInt(e.target.value) })}
              placeholder="2000"
            />
            <p className="text-xs text-foreground/50 mt-1">Recommended: 1800-2500 calories</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Daily Step Goal
            </label>
            <Input
              type="number"
              value={formData.stepGoal}
              onChange={(e) => setFormData({ ...formData, stepGoal: parseInt(e.target.value) })}
              placeholder="10000"
            />
            <p className="text-xs text-foreground/50 mt-1">Recommended: 8000-12000 steps</p>
          </div>
        </div>
        {!isEditing && (
          <Button onClick={handleSubmit} className="mt-4">
            Update Goals
          </Button>
        )}
      </Card>

      {/* Connected Devices */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Connected Devices</h3>
        <div className="space-y-3">
          {[
            { name: "Glucose Monitor", status: "Not Connected", icon: "💉" },
            { name: "Fitness Tracker", status: "Not Connected", icon: "⌚" },
            { name: "Smart Scale", status: "Not Connected", icon: "⚖️" },
          ].map((device) => (
            <div
              key={device.name}
              className="flex items-center justify-between p-4 bg-dark-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{device.icon}</span>
                <div>
                  <p className="font-medium text-foreground">{device.name}</p>
                  <p className="text-sm text-foreground/60">{device.status}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: "Meal Reminders", description: "Get notified when it's time to log meals" },
            { label: "Exercise Reminders", description: "Daily reminders to stay active" },
            { label: "Blood Sugar Alerts", description: "Alerts for abnormal readings" },
            { label: "Appointment Reminders", description: "Reminders for upcoming doctor visits" },
          ].map((notification) => (
            <div
              key={notification.label}
              className="flex items-center justify-between p-4 bg-dark-200 rounded-lg"
            >
              <div>
                <p className="font-medium text-foreground">{notification.label}</p>
                <p className="text-sm text-foreground/60">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-dark-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-teal rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-teal"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Management */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Data Management</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            📥 Export My Data
          </Button>
          <Button variant="outline" className="w-full justify-start">
            🔄 Sync Data
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-400 hover:text-red-300">
            🗑️ Clear All Data
          </Button>
        </div>
      </Card>

      {/* App Info */}
      <Card variant="gradient" className="text-center">
        <div className="space-y-2">
          <h3 className="text-2xl font-display font-bold text-foreground">WellSync</h3>
          <p className="text-sm text-foreground/60">Your Connected Wellness Companion</p>
          <p className="text-xs text-foreground/50">Version 1.0.0</p>
        </div>
      </Card>
    </div>
  );
}
