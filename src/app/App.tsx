import { useState } from "react";
import { PatientSplash } from "./components/PatientSplash";
import { PatientAuth } from "./components/PatientAuth";
import { PatientIntake } from "./components/PatientIntake";
import { PatientStatusScreen } from "./components/PatientStatusScreen";
import { PatientDashboard } from "./components/PatientDashboard";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { Button } from "./components/ui/button";
import { Users, Stethoscope } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

type Screen =
  | "mode-select"
  | "patient-splash"
  | "patient-auth"
  | "patient-intake"
  | "patient-status"
  | "patient-dashboard"
  | "doctor-dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("mode-select");

  const resetPatientFlow = () => {
    setCurrentScreen("patient-splash");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "mode-select":
        return (
          <div className="min-h-screen bg-gradient-to-br from-[#0A2463] via-[#0D3B7A] to-[#06B6D4] flex items-center justify-center p-6">
            <div className="max-w-4xl w-full">
              <div className="text-center mb-12">
                <h1 className="text-5xl text-white mb-4">KSAT Agent</h1>
                <p className="text-xl text-[#06B6D4] mb-2">
                  AI-Powered Smart Medical Triage Platform
                </p>
                <p className="text-white/70">منصة تصنيف طبي ذكي بالذكاء الاصطناعي</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div
                  onClick={() => setCurrentScreen("patient-splash")}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 cursor-pointer hover:bg-white/20 transition-all border-2 border-white/20 hover:border-white/40"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl text-white mb-3">Patient Portal</h2>
                  <p className="text-white/80 mb-6">
                    Smart health assessment and AI-powered triage for patients
                  </p>
                  <p className="text-sm text-white/60">بوابة المرضى</p>
                </div>

                <div
                  onClick={() => setCurrentScreen("doctor-dashboard")}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 cursor-pointer hover:bg-white/20 transition-all border-2 border-white/20 hover:border-white/40"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl text-white mb-3">Doctor Dashboard</h2>
                  <p className="text-white/80 mb-6">
                    Enterprise command center for medical professionals
                  </p>
                  <p className="text-sm text-white/60">لوحة الأطباء</p>
                </div>
              </div>

              <div className="mt-12 text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                  <p className="text-white/80 text-sm">Physician-Supervised Platform</p>
                </div>
                <p className="text-white/60 text-sm">
                  SFDA-Compliant • Enterprise Healthcare • Saudi Vision 2030
                </p>
              </div>
            </div>
          </div>
        );

      case "patient-splash":
        return <PatientSplash onContinue={() => setCurrentScreen("patient-auth")} />;

      case "patient-auth":
        return (
          <PatientAuth onAuthenticated={() => setCurrentScreen("patient-dashboard")} />
        );

      case "patient-intake":
        return (
          <PatientIntake
            onComplete={() => setCurrentScreen("patient-status")}
          />
        );

      case "patient-status":
        return (
          <PatientStatusScreen
            onBackToDashboard={() => setCurrentScreen("patient-dashboard")}
          />
        );

      case "patient-dashboard":
        return (
          <PatientDashboard onNewAssessment={() => setCurrentScreen("patient-intake")} />
        );

      case "doctor-dashboard":
        return <DoctorDashboard />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="size-full">
        {currentScreen !== "mode-select" && (
          <div className="fixed top-4 left-4 z-50">
            <Button
              onClick={() => setCurrentScreen("mode-select")}
              variant="outline"
              className="bg-white/90 backdrop-blur-sm"
            >
              ← Home
            </Button>
          </div>
        )}
        {renderScreen()}
      </div>
      <Toaster />
    </>
  );
}