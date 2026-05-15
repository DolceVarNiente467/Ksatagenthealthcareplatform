import { motion } from "motion/react";
import { FileText, Edit3 } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface SOAPNotePanelProps {
  caseData: any;
}

export function SOAPNotePanel({ caseData }: SOAPNotePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [soapNote, setSoapNote] = useState({
    subjective: `Patient reports persistent skin rash with moderate pain (6/10) for the past few days. Primary complaint includes visible inflammation and discomfort. Patient has a history of Type 2 Diabetes (controlled) and is currently on Metformin 500mg and Lisinopril 10mg. Known allergy to Penicillin.`,
    objective: `Physical examination reveals erythematous patches with mild edema. No signs of infection or systemic involvement. Vital signs within normal limits. AI dermatological analysis indicates patterns consistent with contact dermatitis. Blood glucose levels controlled. No fever or lymphadenopathy.`,
    assessment: `Primary diagnosis: Contact Dermatitis (L25.9). Differential diagnoses include Atopic Dermatitis (L20.9) and Allergic Reaction (T78.40). AI confidence: 94.2%. No immediate emergency indicators. Patient suitable for outpatient management with close follow-up given diabetic history.`,
    plan: `1. Prescribe Hydrocortisone Cream 1% - apply twice daily for 14 days
2. Cetirizine 10mg - once daily for 7-10 days
3. Moisturizing cream - apply 3-4 times daily
4. Patient education on allergen avoidance
5. Follow-up in 7-14 days to assess response
6. If no improvement, refer to Dermatology
7. Monitor wound healing closely due to diabetes
8. Advise patient to seek immediate care if symptoms worsen`,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg">SOAP Clinical Note</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-sm text-primary">S</span>
            </div>
            <h4 className="text-sm">Subjective</h4>
          </div>
          {isEditing ? (
            <Textarea
              value={soapNote.subjective}
              onChange={(e) =>
                setSoapNote({ ...soapNote, subjective: e.target.value })
              }
              className="min-h-24"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {soapNote.subjective}
            </p>
          )}
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <span className="text-sm text-accent">O</span>
            </div>
            <h4 className="text-sm">Objective</h4>
          </div>
          {isEditing ? (
            <Textarea
              value={soapNote.objective}
              onChange={(e) => setSoapNote({ ...soapNote, objective: e.target.value })}
              className="min-h-24"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {soapNote.objective}
            </p>
          )}
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#EAB308]/10 rounded-lg flex items-center justify-center">
              <span className="text-sm text-[#EAB308]">A</span>
            </div>
            <h4 className="text-sm">Assessment</h4>
          </div>
          {isEditing ? (
            <Textarea
              value={soapNote.assessment}
              onChange={(e) =>
                setSoapNote({ ...soapNote, assessment: e.target.value })
              }
              className="min-h-24"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {soapNote.assessment}
            </p>
          )}
        </div>

        <div className="bg-card rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
              <span className="text-sm text-[#22C55E]">P</span>
            </div>
            <h4 className="text-sm">Plan</h4>
          </div>
          {isEditing ? (
            <Textarea
              value={soapNote.plan}
              onChange={(e) => setSoapNote({ ...soapNote, plan: e.target.value })}
              className="min-h-32"
            />
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {soapNote.plan}
            </p>
          )}
        </div>
      </motion.div>

      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 border border-primary/10">
        <p className="text-xs text-center text-muted-foreground mb-3">
          This SOAP note is AI-assisted and can be edited by the physician before finalizing
        </p>
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="text-muted-foreground">Physician Signature</p>
              <p className="text-sm mt-1">Dr. Ahmed Al-Rashid</p>
              <p className="text-muted-foreground">GP License #SA-12345</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Date</p>
              <p className="text-sm mt-1">May 14, 2026</p>
              <p className="text-muted-foreground">KSAT Medical Center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
