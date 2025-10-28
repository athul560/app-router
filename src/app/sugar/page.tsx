"use client";

import { useState } from "react";
import { useWellness } from "@/context/wellnessContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import ChartCard from "@/components/ui/ChartCard";
import { analyzeBloodSugar, formatDate, formatTime } from "@/lib/utils";
import type { BloodSugarReading } from "@/types/wellness";

export default function SugarPage() {
  const { bloodSugarReadings, addBloodSugarReading } = useWellness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    value: "",
    mealContext: "fasting" as BloodSugarReading["mealContext"],
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const reading: BloodSugarReading = {
      id: Date.now().toString(),
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0],
      value: parseInt(formData.value),
      mealContext: formData.mealContext,
      notes: formData.notes || undefined,
    };
    addBloodSugarReading(reading);
    setFormData({ value: "", mealContext: "fasting", notes: "" });
    setIsModalOpen(false);
  };

  const latestReading = bloodSugarReadings[bloodSugarReadings.length - 1];
  const analysis = latestReading ? analyzeBloodSugar(latestReading) : null;

  // Chart data - last 10 readings
  const chartData = bloodSugarReadings.slice(-10).map((reading) => ({
    time: formatTime(reading.time),
    value: reading.value,
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Blood Sugar Monitor 💉
          </h1>
          <p className="text-foreground/60">Track and monitor your blood glucose levels</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Add Reading</Button>
      </div>

      {/* Latest Reading */}
      {latestReading && analysis && (
        <Card variant="gradient" className="border-l-4" style={{ borderColor: analysis.color }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60 mb-2">Latest Reading</p>
              <p className="text-5xl font-bold mb-2" style={{ color: analysis.color }}>
                {latestReading.value} <span className="text-2xl">mg/dL</span>
              </p>
              <p className="text-sm text-foreground/70 capitalize">
                {latestReading.mealContext.replace("_", " ")} • {formatDate(latestReading.date)} at{" "}
                {formatTime(latestReading.time)}
              </p>
            </div>
            <div className="text-right">
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-2"
                style={{ backgroundColor: `${analysis.color}20`, color: analysis.color }}
              >
                {analysis.status.toUpperCase()}
              </div>
              <p className="text-sm text-foreground/70 max-w-xs">{analysis.message}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass">
          <p className="text-sm text-foreground/60 mb-2">Average (7 days)</p>
          <p className="text-3xl font-bold text-primary-teal">
            {bloodSugarReadings.length > 0
              ? Math.round(
                  bloodSugarReadings.slice(-7).reduce((sum, r) => sum + r.value, 0) /
                    Math.min(bloodSugarReadings.length, 7)
                )
              : 0}{" "}
            mg/dL
          </p>
        </Card>
        <Card variant="glass">
          <p className="text-sm text-foreground/60 mb-2">Total Readings</p>
          <p className="text-3xl font-bold text-primary-blue">{bloodSugarReadings.length}</p>
        </Card>
        <Card variant="glass">
          <p className="text-sm text-foreground/60 mb-2">In Range</p>
          <p className="text-3xl font-bold text-primary-purple">
            {bloodSugarReadings.length > 0
              ? Math.round(
                  (bloodSugarReadings.filter((r) => analyzeBloodSugar(r).status === "normal").length /
                    bloodSugarReadings.length) *
                    100
                )
              : 0}
            %
          </p>
        </Card>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <ChartCard
          title="Blood Sugar Trend"
          data={chartData}
          dataKey="value"
          xAxisKey="time"
          type="line"
          color="#a855f7"
          height={300}
        />
      )}

      {/* IoT Device Connection */}
      <Card variant="glass">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-display font-semibold mb-2">Connect Glucose Monitor</h3>
            <p className="text-sm text-foreground/60">
              Sync your readings automatically from compatible Bluetooth devices
            </p>
          </div>
          <Button variant="outline">🔗 Connect Device</Button>
        </div>
        <div className="mt-6 p-4 bg-dark-200 rounded-lg">
          <p className="text-sm text-foreground/70">
            <strong>Supported Devices:</strong> Most Bluetooth-enabled glucose monitors including
            FreeStyle Libre, Dexcom, and Contour Next.
          </p>
        </div>
      </Card>

      {/* Reading History */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Reading History</h3>
        {bloodSugarReadings.length === 0 ? (
          <p className="text-center text-foreground/50 py-8">No readings recorded yet</p>
        ) : (
          <div className="space-y-3">
            {bloodSugarReadings
              .slice()
              .reverse()
              .slice(0, 10)
              .map((reading) => {
                const readingAnalysis = analyzeBloodSugar(reading);
                return (
                  <div
                    key={reading.id}
                    className="flex items-center justify-between p-4 bg-dark-200 rounded-lg hover:bg-dark-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                        style={{ backgroundColor: `${readingAnalysis.color}20`, color: readingAnalysis.color }}
                      >
                        {reading.value}
                      </div>
                      <div>
                        <p className="font-medium text-foreground capitalize">
                          {reading.mealContext.replace("_", " ")}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {formatDate(reading.date)} at {formatTime(reading.time)}
                        </p>
                        {reading.notes && (
                          <p className="text-xs text-foreground/50 mt-1">{reading.notes}</p>
                        )}
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${readingAnalysis.color}20`, color: readingAnalysis.color }}
                    >
                      {readingAnalysis.status}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Card>

      {/* Health Tips */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Blood Sugar Management Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "🥗", tip: "Eat balanced meals with fiber, protein, and healthy fats" },
            { icon: "💪", tip: "Exercise regularly to improve insulin sensitivity" },
            { icon: "💧", tip: "Stay hydrated throughout the day" },
            { icon: "😴", tip: "Get adequate sleep (7-9 hours per night)" },
            { icon: "🧘", tip: "Manage stress through meditation or yoga" },
            { icon: "📊", tip: "Monitor your levels regularly and track patterns" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-dark-200 rounded-lg">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm text-foreground/80">{item.tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Add Reading Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Blood Sugar Reading">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Blood Sugar Level (mg/dL)"
            type="number"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder="100"
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Meal Context</label>
            <select
              value={formData.mealContext}
              onChange={(e) =>
                setFormData({ ...formData, mealContext: e.target.value as BloodSugarReading["mealContext"] })
              }
              className="w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-teal"
            >
              <option value="fasting">Fasting</option>
              <option value="before_meal">Before Meal</option>
              <option value="after_meal">After Meal</option>
              <option value="random">Random</option>
            </select>
          </div>
          <Input
            label="Notes (Optional)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any additional notes..."
          />
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Add Reading
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
