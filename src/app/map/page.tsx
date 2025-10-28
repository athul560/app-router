"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { NEARBY_FACILITY_TYPES } from "@/lib/constants";

export default function MapPage() {
  const [selectedType, setSelectedType] = useState("gym");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          alert("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      setLoading(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Mock nearby facilities
  const mockFacilities = [
    { name: "FitZone Gym", distance: "0.5 km", rating: 4.5, type: "gym" },
    { name: "PowerHouse Fitness", distance: "1.2 km", rating: 4.8, type: "gym" },
    { name: "City General Hospital", distance: "2.1 km", rating: 4.3, type: "hospital" },
    { name: "MediCare Center", distance: "1.8 km", rating: 4.6, type: "hospital" },
    { name: "HealthPlus Pharmacy", distance: "0.3 km", rating: 4.7, type: "pharmacy" },
    { name: "QuickMed Pharmacy", distance: "0.8 km", rating: 4.4, type: "pharmacy" },
  ];

  const filteredFacilities = mockFacilities.filter((f) => f.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Nearby Facilities 🗺️
        </h1>
        <p className="text-foreground/60">Find gyms, hospitals, and pharmacies near you</p>
      </div>

      {/* Location Status */}
      <Card variant="gradient">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground/60 mb-2">Your Location</p>
            {location ? (
              <p className="text-lg font-medium text-primary-teal">
                📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            ) : (
              <p className="text-lg text-foreground/50">Location not set</p>
            )}
          </div>
          <Button onClick={handleGetLocation} disabled={loading}>
            {loading ? "Getting Location..." : "📍 Get My Location"}
          </Button>
        </div>
      </Card>

      {/* Facility Type Selector */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {NEARBY_FACILITY_TYPES.map((facility) => (
          <button
            key={facility.type}
            onClick={() => setSelectedType(facility.type)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              selectedType === facility.type
                ? "bg-primary-teal text-background shadow-lg shadow-primary-teal/30"
                : "bg-dark-200 text-foreground hover:bg-dark-300"
            }`}
          >
            <span className="text-xl">{facility.icon}</span>
            {facility.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card variant="glass" className="h-[500px]">
            <div className="w-full h-full bg-dark-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Map Grid Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-8 h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-primary-teal/30" />
                  ))}
                </div>
              </div>
              
              {/* Map Content */}
              <div className="relative z-10 text-center">
                <span className="text-6xl mb-4 block">🗺️</span>
                <p className="text-foreground/60 mb-4">Interactive Map View</p>
                <p className="text-sm text-foreground/40 max-w-md">
                  Google Maps integration would display here with markers for nearby facilities.
                  Enable location to see facilities around you.
                </p>
                {location && (
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary-teal/20 rounded-lg">
                    <span className="w-3 h-3 bg-primary-teal rounded-full animate-pulse" />
                    <span className="text-sm text-primary-teal font-medium">Your Location</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Facilities List */}
        <div className="space-y-4">
          <h3 className="text-xl font-display font-semibold text-foreground">
            Nearby {NEARBY_FACILITY_TYPES.find((f) => f.type === selectedType)?.label}
          </h3>
          {filteredFacilities.map((facility, index) => (
            <Card key={index} variant="glass" className="hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{facility.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-foreground/60">
                    <span>📍 {facility.distance}</span>
                    <span>•</span>
                    <span>⭐ {facility.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Directions
                </Button>
                <Button size="sm" variant="ghost" className="flex-1">
                  Call
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card variant="glass">
        <h3 className="text-xl font-display font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🚨", label: "Emergency Services", desc: "Call 911" },
            { icon: "🏥", label: "Nearest Hospital", desc: "Get directions" },
            { icon: "💊", label: "24/7 Pharmacy", desc: "Find open now" },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-start gap-3 p-4 bg-dark-200 rounded-lg hover:bg-dark-300 transition-all text-left"
            >
              <span className="text-3xl">{action.icon}</span>
              <div>
                <p className="font-medium text-foreground">{action.label}</p>
                <p className="text-sm text-foreground/60">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Info Card */}
      <Card variant="gradient" className="border-l-4 border-primary-blue">
        <div className="flex items-start gap-4">
          <span className="text-3xl">ℹ️</span>
          <div>
            <h4 className="font-semibold text-foreground mb-2">About This Feature</h4>
            <p className="text-sm text-foreground/70">
              This feature uses your device&apos;s location to find nearby health and fitness facilities.
              In a production environment, this would integrate with Google Maps API to show real-time
              locations, directions, and facility information.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
