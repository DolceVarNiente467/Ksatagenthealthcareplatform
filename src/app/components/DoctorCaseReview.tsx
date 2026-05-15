import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Send,
  Calendar,
  UserPlus,
  FlaskConical,
  Pill,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  AlertTriangle,
  Image as ImageIcon,
  Brain,
  Activity,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { AIRecommendationsPanel } from "./AIRecommendationsPanel";
import { SOAPNotePanel } from "./SOAPNotePanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface DoctorCaseReviewProps {
  caseData: any;
  onBack: () => void;
}

export function DoctorCaseReview({ caseData, onBack }: DoctorCaseReviewProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [actionData, setActionData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      label: "Needs Monitoring",
    },
    green: {
      color: "#22C55E",
      bgColor: "bg-[#22C55E]/10",
      borderColor: "border-[#22C55E]/30",
      icon: CheckCircle2,
      label: "Low Risk",
    },
  };

  const config = riskConfig[caseData.riskLevel];
  const Icon = config.icon;

  const actions = [
    {
      id: "approve",
      label: "Approve Case",
      icon: CheckCircle2,
      color: "bg-[#22C55E]",
      description: "Confirm AI assessment and close case",
    },
    {
      id: "request-info",
      label: "Request Info",
      icon: MessageSquare,
      color: "bg-[#06B6D4]",
      description: "Ask patient for more details",
    },
    {
      id: "send-survey",
      label: "Send Survey",
      icon: ClipboardList,
      color: "bg-[#8B5CF6]",
      description: "Additional assessment questionnaire",
    },
    {
      id: "physical-visit",
      label: "Physical Visit",
      icon: Calendar,
      color: "bg-[#EAB308]",
      description: "Schedule in-person appointment",
    },
    {
      id: "refer-specialist",
      label: "Refer to Specialist",
      icon: UserPlus,
      color: "bg-[#F97316]",
      description: "Transfer to specialist doctor",
    },
    {
      id: "lab-test",
      label: "Lab Appointment",
      icon: FlaskConical,
      color: "bg-[#06B6D4]",
      description: "Order laboratory tests",
    },
    {
      id: "prescribe",
      label: "Prescribe",
      icon: Pill,
      color: "bg-primary",
      description: "Issue prescription",
    },
    {
      id: "follow-up",
      label: "Follow-up",
      icon: Send,
      color: "bg-[#EC4899]",
      description: "Send instructions to patient",
    },
  ];

  const handleAction = (actionId: string) => {
    setSelectedAction(actionId);
  };

  const handleSubmitAction = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedAction(null);

      let message = "";
      switch (selectedAction) {
        case "approve":
          message = "Case approved successfully";
          break;
        case "request-info":
          message = "Information request sent to patient";
          break;
        case "send-survey":
          message = "Follow-up survey sent to patient";
          break;
        case "physical-visit":
          message = "Physical visit appointment scheduled";
          break;
        case "refer-specialist":
          message = "Case referred to specialist";
          break;
        case "lab-test":
          message = "Lab appointment scheduled";
          break;
        case "prescribe":
          message = "Prescription issued successfully";
          break;
        case "follow-up":
          message = "Follow-up instructions sent";
          break;
      }

      toast.success(message, {
        description: "Patient has been notified",
      });

      setTimeout(() => {
        onBack();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-accent p-4 text-white">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Queue
          </Button>

          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 ${config.bgColor} rounded-2xl flex items-center justify-center`}
            >
              <Icon className="w-8 h-8" style={{ color: config.color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl">{caseData.patientName}</h1>
                <Badge
                  className="bg-white/20 text-white"
                  style={{ borderColor: config.color }}
                >
                  {config.label}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span>Case ID: {caseData.id}</span>
                <span>National ID: {caseData.nationalId}</span>
                <span>Submitted: {caseData.submittedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="clinical" className="mb-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="clinical" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Clinical Summary
            </TabsTrigger>
            <TabsTrigger value="ai-recommendations" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger value="soap-note" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              SOAP Note
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clinical" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3>AI Executive Summary</h3>
              </div>
              <div className={`${config.bgColor} rounded-2xl p-4 border ${config.borderColor} mb-4`}>
                <p className="text-sm leading-relaxed">{caseData.aiSummary}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4" />
                <span>AI Confidence: {caseData.aiConfidence}%</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm"
            >
              <h3 className="mb-4">Chief Complaint</h3>
              <p className="text-sm leading-relaxed bg-secondary rounded-2xl p-4">
                {caseData.chiefComplaint}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm"
            >
              <h3 className="mb-4">Medical History</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-muted-foreground min-w-32">
                    Chronic Conditions:
                  </span>
                  <span>Type 2 Diabetes (controlled)</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground min-w-32">Medications:</span>
                  <span>Metformin 500mg, Lisinopril 10mg</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground min-w-32">Allergies:</span>
                  <span>Penicillin</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground min-w-32">Pain Level:</span>
                  <span>6/10</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground min-w-32">Duration:</span>
                  <span>Few days</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm"
            >
              <h3 className="mb-4">Uploaded Images</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="aspect-square bg-secondary rounded-2xl flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-4 bg-accent/10 rounded-2xl p-4 border border-accent/20">
                <p className="text-sm text-muted-foreground">
                  <strong>AI Vision Analysis:</strong> Detected inflammatory skin condition
                  consistent with contact dermatitis. No signs of infection or malignancy.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm"
            >
              <h3 className="mb-4">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">Case submitted via KSAT mobile app</p>
                    <p className="text-xs text-muted-foreground">
                      May 14, 2026 at 10:45 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">AI triage completed</p>
                    <p className="text-xs text-muted-foreground">
                      May 14, 2026 at 10:46 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">Assigned to Dr. Ahmed Al-Rashid</p>
                    <p className="text-xs text-muted-foreground">
                      May 14, 2026 at 10:47 AM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-6"
            >
              <h3 className="mb-4">Doctor Actions</h3>
              <div className="space-y-2">
                {actions.map((action) => {
                  const ActionIcon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-border hover:border-accent transition-all text-left ${action.color} bg-opacity-5`}
                    >
                      <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center`}>
                        <ActionIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{action.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-6"
                >
                  <h3 className="mb-4">Doctor Actions</h3>
                  <div className="space-y-2">
                    {actions.map((action) => {
                      const ActionIcon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAction(action.id)}
                          className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-border hover:border-accent transition-all text-left ${action.color} bg-opacity-5`}
                        >
                          <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center`}>
                            <ActionIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{action.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-recommendations" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <AIRecommendationsPanel caseData={caseData} />
            </div>
          </TabsContent>

          <TabsContent value="soap-note" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <SOAPNotePanel caseData={caseData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={selectedAction !== null} onOpenChange={() => setSelectedAction(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {actions.find((a) => a.id === selectedAction)?.label}
            </DialogTitle>
            <DialogDescription>
              {actions.find((a) => a.id === selectedAction)?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {selectedAction === "approve" && (
              <div className="space-y-3">
                <Label>Final Notes</Label>
                <Textarea
                  placeholder="Add any final notes or recommendations..."
                  value={actionData.notes || ""}
                  onChange={(e) => setActionData({ ...actionData, notes: e.target.value })}
                  className="min-h-24"
                />
              </div>
            )}

            {selectedAction === "request-info" && (
              <div className="space-y-3">
                <Label>Information Request</Label>
                <Textarea
                  placeholder="What additional information do you need from the patient?"
                  value={actionData.request || ""}
                  onChange={(e) =>
                    setActionData({ ...actionData, request: e.target.value })
                  }
                  className="min-h-32"
                />
              </div>
            )}

            {selectedAction === "send-survey" && (
              <div className="space-y-3">
                <Label>Survey Type</Label>
                <div className="space-y-2">
                  <button className="w-full p-3 text-left bg-secondary rounded-xl hover:bg-secondary/80">
                    Dermatology Follow-up
                  </button>
                  <button className="w-full p-3 text-left bg-secondary rounded-xl hover:bg-secondary/80">
                    Pain Assessment
                  </button>
                  <button className="w-full p-3 text-left bg-secondary rounded-xl hover:bg-secondary/80">
                    General Health Check
                  </button>
                </div>
              </div>
            )}

            {selectedAction === "physical-visit" && (
              <div className="space-y-3">
                <Label>Appointment Date</Label>
                <Input type="date" />
                <Label>Appointment Time</Label>
                <Input type="time" />
                <Label>Location</Label>
                <Input placeholder="KSAT Medical Center" />
              </div>
            )}

            {selectedAction === "refer-specialist" && (
              <div className="space-y-3">
                <Label>Specialist Type</Label>
                <select className="w-full p-3 rounded-xl border border-border bg-background">
                  <option>Dermatologist</option>
                  <option>Cardiologist</option>
                  <option>Orthopedic</option>
                  <option>Neurologist</option>
                </select>
                <Label>Referral Notes</Label>
                <Textarea placeholder="Reason for referral..." className="min-h-24" />
              </div>
            )}

            {selectedAction === "lab-test" && (
              <div className="space-y-3">
                <Label>Test Type</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Complete Blood Count (CBC)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Blood Glucose</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Lipid Panel</span>
                  </label>
                </div>
                <Label>Appointment Date</Label>
                <Input type="date" />
              </div>
            )}

            {selectedAction === "prescribe" && (
              <div className="space-y-3">
                <Label>Medication</Label>
                <Input placeholder="e.g., Hydrocortisone Cream 1%" />
                <Label>Dosage</Label>
                <Input placeholder="e.g., Apply twice daily" />
                <Label>Duration</Label>
                <Input placeholder="e.g., 14 days" />
                <Label>Instructions</Label>
                <Textarea placeholder="Special instructions..." className="min-h-20" />
              </div>
            )}

            {selectedAction === "follow-up" && (
              <div className="space-y-3">
                <Label>Follow-up Instructions</Label>
                <Textarea
                  placeholder="Instructions for the patient..."
                  value={actionData.instructions || ""}
                  onChange={(e) =>
                    setActionData({ ...actionData, instructions: e.target.value })
                  }
                  className="min-h-32"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setSelectedAction(null)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitAction}
              className="flex-1 bg-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm & Send"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
