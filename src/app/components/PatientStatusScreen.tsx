import { motion } from "motion/react";
import { CheckCircle2, Clock, FileText, Stethoscope, Shield } from "lucide-react";
import { Button } from "./ui/button";

interface PatientStatusScreenProps {
  onBackToDashboard: () => void;
}

export function PatientStatusScreen({ onBackToDashboard }: PatientStatusScreenProps) {
  const timeline = [
    {
      id: 1,
      label: "Submitted",
      labelAr: "تم الإرسال",
      status: "completed",
      time: "Just now"
    },
    {
      id: 2,
      label: "AI Pre-screening Complete",
      labelAr: "اكتمل الفحص الأولي",
      status: "completed",
      time: "2 min ago"
    },
    {
      id: 3,
      label: "Under GP Review",
      labelAr: "قيد المراجعة الطبية",
      status: "in-progress",
      time: "In progress"
    },
    {
      id: 4,
      label: "Final Report Issued",
      labelAr: "إصدار التقرير النهائي",
      status: "pending",
      time: "Pending"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary via-[#0D3B7A] to-accent p-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-3xl mb-6">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl mb-2">Case Submitted Successfully</h1>
          <p className="text-white/80 text-lg">تم إرسال الحالة بنجاح</p>
        </motion.div>
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl p-8 border border-border shadow-sm text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl mb-3">Your case has been submitted successfully and referred to a General Practitioner (GP) for medical review.</h2>
          <p className="text-lg mb-4 text-muted-foreground">
            تمت إحالة حالتك إلى الطبيب العام وسيتم إصدار التقرير النهائي والتوصيات الطبية بعد مراجعة الطبيب.
          </p>

          <div className="bg-primary/5 rounded-2xl p-4 mb-6 border border-primary/10">
            <div className="flex items-start gap-2">
              <Stethoscope className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Physician-Supervised Care:</strong> AI pre-screening assists your doctor, but all diagnoses, treatments, and recommendations are made by licensed medical professionals.
              </p>
            </div>
          </div>

          <div className="bg-secondary rounded-2xl p-6">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <Clock className="w-5 h-5" />
              <p>Estimated Review Time</p>
            </div>
            <p className="text-3xl mb-1">2-4 hours</p>
            <p className="text-sm text-muted-foreground">During business hours</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl p-6 border border-border shadow-sm"
        >
          <h3 className="mb-6">Review Progress</h3>
          <div className="space-y-4">
            {timeline.map((item, index) => {
              const isCompleted = item.status === "completed";
              const isInProgress = item.status === "in-progress";
              const isPending = item.status === "pending";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all ${
                    isInProgress
                      ? "bg-accent/10 border-2 border-accent/30"
                      : isCompleted
                      ? "bg-[#22C55E]/5 border border-[#22C55E]/20"
                      : "bg-secondary border border-border"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? "bg-[#22C55E]"
                        : isInProgress
                        ? "bg-accent"
                        : "bg-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : isInProgress ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <div className="w-3 h-3 bg-muted-foreground/30 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`mb-1 ${isCompleted || isInProgress ? "" : "text-muted-foreground"}`}>
                      {item.label}
                    </p>
                    <p className={`text-sm mb-1 ${isCompleted || isInProgress ? "" : "text-muted-foreground"}`}>
                      {item.labelAr}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10"
        >
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary mt-1" />
            <div>
              <h4 className="mb-2">What happens next?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Your physician will review your case and AI pre-screening</li>
                <li>• You will receive a notification when your medical report is ready</li>
                <li>• All recommendations will be reviewed and approved by a licensed doctor</li>
                <li>• Prescriptions and follow-up instructions will be available in your dashboard</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onBackToDashboard}
            className="w-full bg-primary hover:bg-primary/90 h-14 rounded-2xl"
          >
            Return to Dashboard
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-xs text-muted-foreground"
        >
          <p>SFDA-Compliant Physician-Supervised Platform</p>
          <p className="mt-1">All diagnoses and treatments are reviewed by licensed physicians</p>
        </motion.div>
      </div>
    </div>
  );
}
