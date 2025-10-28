"use client";

import { useState } from "react";
import { useWellness } from "@/context/wellnessContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { DoctorAppointment } from "@/types/wellness";

export default function DoctorPage() {
  const { appointments, addAppointment } = useWellness();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: "",
    specialty: DOCTOR_SPECIALTIES[0],
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointment: DoctorAppointment = {
      id: Date.now().toString(),
      doctorName: formData.doctorName,
      specialty: formData.specialty,
      date: formData.date,
      time: formData.time,
      status: "scheduled",
      notes: formData.notes || undefined,
    };
    addAppointment(appointment);
    setFormData({
      doctorName: "",
      specialty: DOCTOR_SPECIALTIES[0],
      date: "",
      time: "",
      notes: "",
    });
    setIsModalOpen(false);
  };

  const upcomingAppointments = appointments.filter((a) => a.status === "scheduled");
  const pastAppointments = appointments.filter((a) => a.status === "completed");

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Doctor Consultations 👨‍⚕️
          </h1>
          <p className="text-foreground/60">Book and manage your medical appointments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Book Appointment</Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Upcoming</p>
          <p className="text-4xl font-bold text-primary-teal">{upcomingAppointments.length}</p>
        </Card>
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Completed</p>
          <p className="text-4xl font-bold text-primary-blue">{pastAppointments.length}</p>
        </Card>
        <Card variant="gradient">
          <p className="text-sm text-foreground/60 mb-2">Total</p>
          <p className="text-4xl font-bold text-primary-purple">{appointments.length}</p>
        </Card>
      </div>

      {/* Specialties */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Available Specialties</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DOCTOR_SPECIALTIES.map((specialty) => (
            <div
              key={specialty}
              className="p-4 bg-dark-200 rounded-lg text-center hover:bg-dark-300 transition-all hover:scale-105 cursor-pointer"
            >
              <span className="text-3xl block mb-2">👨‍⚕️</span>
              <p className="text-sm font-medium text-foreground">{specialty}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Appointments */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Upcoming Appointments</h3>
        {upcomingAppointments.length === 0 ? (
          <p className="text-center text-foreground/50 py-8">No upcoming appointments</p>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-dark-200 rounded-lg hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-teal/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{appointment.doctorName}</p>
                    <p className="text-sm text-foreground/60">{appointment.specialty}</p>
                    <p className="text-sm text-primary-teal mt-1">
                      📅 {formatDate(appointment.date)} at {appointment.time}
                    </p>
                    {appointment.notes && (
                      <p className="text-xs text-foreground/50 mt-1">{appointment.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                  <Button size="sm" variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Consultation Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="gradient" className="border-l-4 border-primary-teal">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💬</span>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Chat Consultation</h4>
              <p className="text-sm text-foreground/70 mb-4">
                Get instant advice from healthcare professionals via secure chat
              </p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </div>
          </div>
        </Card>

        <Card variant="gradient" className="border-l-4 border-primary-blue">
          <div className="flex items-start gap-4">
            <span className="text-4xl">📹</span>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Video Consultation</h4>
              <p className="text-sm text-foreground/70 mb-4">
                Schedule a video call with your doctor from the comfort of home
              </p>
              <Button variant="outline" size="sm">
                Schedule Video Call
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Upload Reports */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Health Reports</h3>
        <div className="border-2 border-dashed border-dark-300 rounded-lg p-8 text-center hover:border-primary-teal transition-colors cursor-pointer">
          <span className="text-5xl block mb-4">📄</span>
          <p className="text-foreground mb-2">Upload your health reports</p>
          <p className="text-sm text-foreground/60 mb-4">
            PDF, JPG, PNG up to 10MB
          </p>
          <Button variant="outline" size="sm">
            Choose File
          </Button>
        </div>
      </Card>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <Card variant="glass">
          <h3 className="text-xl font-display font-semibold mb-4">Past Appointments</h3>
          <div className="space-y-3">
            {pastAppointments.slice(0, 5).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-dark-200 rounded-lg opacity-75"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-medium text-foreground">{appointment.doctorName}</p>
                    <p className="text-sm text-foreground/60">
                      {formatDate(appointment.date)} • {appointment.specialty}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Book Appointment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Appointment">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Doctor Name"
            value={formData.doctorName}
            onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
            placeholder="Dr. John Smith"
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Specialty</label>
            <select
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full px-4 py-2.5 bg-dark-200 border border-dark-300 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary-teal"
            >
              {DOCTOR_SPECIALTIES.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <Input
            label="Notes (Optional)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Reason for visit, symptoms, etc."
          />
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Book Appointment
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
