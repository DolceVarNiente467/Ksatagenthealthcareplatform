import { motion } from "motion/react";
import { useState } from "react";
import {
  Users,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  TrendingUp,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DoctorCaseReview } from "./DoctorCaseReview";

export function DoctorDashboard() {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>("all");

  const stats = [
    {
      label: "Total Cases",
      value: "156",
      change: "+12%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "Critical Cases",
      value: "8",
      change: "-2",
      icon: AlertCircle,
      color: "text-[#EF4444]",
      bgColor: "bg-[#EF4444]/10"
    },
    {
      label: "Pending Review",
      value: "23",
      change: "+5",
      icon: Clock,
      color: "text-[#EAB308]",
      bgColor: "bg-[#EAB308]/10"
    },
    {
      label: "Resolved Today",
      value: "34",
      change: "+8",
      icon: CheckCircle2,
      color: "text-[#22C55E]",
      bgColor: "bg-[#22C55E]/10"
    },
  ];

  const cases = [
    {
      id: "CS-2026-001",
      patientName: "Mohammed Al-Saud",
      nationalId: "1******234",
      riskLevel: "red",
      priority: "High",
      submittedAt: "10:45 AM",
      chiefComplaint: "Severe chest pain, difficulty breathing",
      aiConfidence: 98.5,
      aiSummary:
        "Urgent evaluation required. Symptoms indicate possible cardiac event.",
    },
    {
      id: "CS-2026-002",
      patientName: "Fatima Al-Harbi",
      nationalId: "2******567",
      riskLevel: "yellow",
      priority: "Medium",
      submittedAt: "9:30 AM",
      chiefComplaint: "Persistent skin rash, mild pain",
      aiConfidence: 94.2,
      aiSummary:
        "Dermatological assessment recommended within 48 hours. No emergency indicators.",
    },
    {
      id: "CS-2026-003",
      patientName: "Abdullah Al-Qahtani",
      nationalId: "1******890",
      riskLevel: "green",
      priority: "Low",
      submittedAt: "8:15 AM",
      chiefComplaint: "Minor headache, general fatigue",
      aiConfidence: 96.7,
      aiSummary:
        "Low-risk symptoms. Home care with monitoring recommended.",
    },
    {
      id: "CS-2026-004",
      patientName: "Noura Al-Mutairi",
      nationalId: "2******123",
      riskLevel: "yellow",
      priority: "Medium",
      submittedAt: "11:20 AM",
      chiefComplaint: "Chronic back pain, reduced mobility",
      aiConfidence: 92.1,
      aiSummary: "Orthopedic evaluation recommended. Physical therapy may be beneficial.",
    },
  ];

  const filteredCases =
    filterRisk === "all"
      ? cases
      : cases.filter((c) => c.riskLevel === filterRisk);

  const riskConfig: any = {
    red: {
      color: "#EF4444",
      bgColor: "bg-[#EF4444]/10",
      borderColor: "border-[#EF4444]/30",
      icon: AlertCircle,
      label: "Critical",
    },
    yellow: {
      color: "#EAB308",
      bgColor: "bg-[#EAB308]/10",
      borderColor: "border-[#EAB308]/30",
      icon: AlertTriangle,
      label: "Monitor",
    },
    green: {
      color: "#22C55E",
      bgColor: "bg-[#22C55E]/10",
      borderColor: "border-[#22C55E]/30",
      icon: CheckCircle2,
      label: "Low Risk",
    },
  };

  if (selectedCase) {
    return (
      <DoctorCaseReview
        caseData={selectedCase}
        onBack={() => setSelectedCase(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl mb-1">KSAT Command Center</h1>
              <p className="text-white/80">مركز عمليات وكيل KSAT</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-lg">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl mb-1">{stat.value}</p>
                  <p className="text-sm text-white/80">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search cases by ID, name, or symptoms..."
                className="pl-12 h-12 rounded-2xl"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterRisk("all")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filterRisk === "all"
                  ? "bg-primary text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              All Cases
            </button>
            <button
              onClick={() => setFilterRisk("red")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filterRisk === "red"
                  ? "bg-[#EF4444] text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterRisk("yellow")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filterRisk === "yellow"
                  ? "bg-[#EAB308] text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Monitor
            </button>
            <button
              onClick={() => setFilterRisk("green")}
              className={`px-4 py-2 rounded-xl transition-all ${
                filterRisk === "green"
                  ? "bg-[#22C55E] text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Low Risk
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredCases.map((caseItem, index) => {
            const config = riskConfig[caseItem.riskLevel];
            const Icon = config.icon;

            return (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCase(caseItem)}
                className={`bg-card rounded-2xl p-6 border-2 ${config.borderColor} cursor-pointer hover:shadow-lg transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 ${config.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-7 h-7" style={{ color: config.color }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg">{caseItem.patientName}</h3>
                          <Badge
                            className={config.bgColor}
                            style={{ color: config.color }}
                          >
                            {config.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>ID: {caseItem.id}</span>
                          <span>NID: {caseItem.nationalId}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {caseItem.submittedAt}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary rounded-xl p-4 mb-3">
                      <p className="text-sm mb-2">
                        <strong>Chief Complaint:</strong> {caseItem.chiefComplaint}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {caseItem.aiSummary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-xs text-muted-foreground">
                          AI Confidence: {caseItem.aiConfidence}%
                        </span>
                      </div>
                      <span className="text-sm text-primary">
                        Click to Review →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
