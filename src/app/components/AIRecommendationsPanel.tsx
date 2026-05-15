import { motion } from "motion/react";
import { Brain, AlertTriangle, CheckCircle2, Pill, FlaskConical, UserPlus, ClipboardCheck, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";

interface AIRecommendationsPanelProps {
  caseData: any;
}

export function AIRecommendationsPanel({ caseData }: AIRecommendationsPanelProps) {
  const recommendations = {
    urgencyLevel: "medium",
    confidence: 94.2,
    suggestedConditions: [
      { name: "Contact Dermatitis", probability: 78, icd10: "L25.9" },
      { name: "Atopic Dermatitis", probability: 15, icd10: "L20.9" },
      { name: "Allergic Reaction", probability: 7, icd10: "T78.40" },
    ],
    treatmentRecommendations: [
      {
        category: "First-line Treatment",
        medications: [
          { name: "Hydrocortisone Cream 1%", dosage: "Apply twice daily", duration: "14 days" },
          { name: "Cetirizine 10mg", dosage: "Once daily", duration: "7-10 days" },
        ],
      },
      {
        category: "Supportive Care",
        medications: [
          { name: "Moisturizing Cream", dosage: "Apply 3-4 times daily", duration: "Ongoing" },
        ],
      },
    ],
    labTestsNeeded: false,
    labTestsSuggested: ["Complete Blood Count (if symptoms persist)"],
    specialistReferral: {
      needed: false,
      suggestion: "Consider if no improvement in 2 weeks",
      specialty: "Dermatologist",
    },
    followUpMonitoring: {
      needed: true,
      timeline: "7-14 days",
      instructions: "Monitor for symptom improvement and adverse reactions",
    },
    clinicalNotes: [
      "Patient reports moderate pain (6/10) with visible inflammation",
      "No signs of infection or systemic involvement",
      "Good candidate for outpatient management",
      "Patient has controlled diabetes - monitor wound healing",
    ],
  };

  const urgencyConfig: any = {
    high: { color: "#EF4444", label: "High Priority", bgColor: "bg-[#EF4444]/10" },
    medium: { color: "#EAB308", label: "Medium Priority", bgColor: "bg-[#EAB308]/10" },
    low: { color: "#22C55E", label: "Low Priority", bgColor: "bg-[#22C55E]/10" },
  };

  const config = urgencyConfig[recommendations.urgencyLevel];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl p-6 border-2 border-accent/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg">AI Clinical Assistant</h3>
            <p className="text-sm text-muted-foreground">Suggested Analysis & Recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`${config.bgColor} rounded-2xl p-4 border border-current/20`} style={{ color: config.color }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <p className="text-sm">Urgency</p>
            </div>
            <p className="text-lg">{config.label}</p>
          </div>
          <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
            <div className="flex items-center gap-2 mb-1 text-primary">
              <TrendingUp className="w-4 h-4" />
              <p className="text-sm">Confidence</p>
            </div>
            <p className="text-lg text-primary">{recommendations.confidence}%</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-3xl p-6 border border-border shadow-sm"
      >
        <h4 className="mb-4">Suggested Differential Diagnosis</h4>
        <div className="space-y-3">
          {recommendations.suggestedConditions.map((condition, index) => (
            <div key={index} className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{condition.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {condition.icd10}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{condition.probability}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all"
                  style={{ width: `${condition.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-3xl p-6 border border-border shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Pill className="w-5 h-5 text-primary" />
          <h4>Suggested Treatment Plan</h4>
        </div>
        {recommendations.treatmentRecommendations.map((category, catIndex) => (
          <div key={catIndex} className="mb-4 last:mb-0">
            <p className="text-sm text-primary mb-3">{category.category}</p>
            <div className="space-y-2">
              {category.medications.map((med, medIndex) => (
                <div key={medIndex} className="bg-secondary rounded-2xl p-4">
                  <p className="mb-2">{med.name}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Dosage: {med.dosage}</span>
                    <span>Duration: {med.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-5 h-5 text-accent" />
            <h4 className="text-sm">Laboratory Tests</h4>
          </div>
          <div className={`flex items-center gap-2 mb-2 ${recommendations.labTestsNeeded ? "text-[#EAB308]" : "text-[#22C55E]"}`}>
            {recommendations.labTestsNeeded ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span className="text-sm">
              {recommendations.labTestsNeeded ? "Recommended" : "Not Required"}
            </span>
          </div>
          {recommendations.labTestsSuggested.length > 0 && (
            <div className="text-xs text-muted-foreground mt-2">
              <p>Optional:</p>
              <ul className="mt-1 space-y-1">
                {recommendations.labTestsSuggested.map((test, i) => (
                  <li key={i}>• {test}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <UserPlus className="w-5 h-5 text-accent" />
            <h4 className="text-sm">Specialist Referral</h4>
          </div>
          <div className={`flex items-center gap-2 mb-2 ${recommendations.specialistReferral.needed ? "text-[#EAB308]" : "text-[#22C55E]"}`}>
            {recommendations.specialistReferral.needed ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span className="text-sm">
              {recommendations.specialistReferral.needed ? "Needed" : "Not Required"}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            <p>{recommendations.specialistReferral.suggestion}</p>
            {recommendations.specialistReferral.specialty && (
              <p className="mt-1 text-primary">→ {recommendations.specialistReferral.specialty}</p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-5 border border-border"
      >
        <div className="flex items-center gap-2 mb-3">
          <ClipboardCheck className="w-5 h-5 text-accent" />
          <h4 className="text-sm">Follow-up Monitoring</h4>
        </div>
        <div className="bg-secondary rounded-xl p-4">
          <p className="text-sm mb-2">
            <strong>Timeline:</strong> {recommendations.followUpMonitoring.timeline}
          </p>
          <p className="text-sm text-muted-foreground">
            {recommendations.followUpMonitoring.instructions}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl p-5 border border-border"
      >
        <h4 className="mb-3 text-sm">Clinical Notes</h4>
        <ul className="space-y-2">
          {recommendations.clinicalNotes.map((note, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-4 border border-accent/20">
        <p className="text-xs text-center text-muted-foreground">
          AI recommendations are suggestions only. Final clinical decisions are made by the licensed physician.
        </p>
      </div>
    </div>
  );
}
