import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { Camera, Mic, ChevronRight, Upload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface PatientIntakeProps {
  onComplete: (data: any) => void;
}

export function PatientIntake({ onComplete }: PatientIntakeProps) {
  const [step, setStep] = useState(1);
  const [painLevel, setPainLevel] = useState([3]);
  const [formData, setFormData] = useState({
    symptoms: "",
    duration: "",
    painLevel: 3,
    chronicConditions: "",
    medications: "",
    skinConcern: "",
    imageUploaded: false,
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({ ...formData, painLevel: painLevel[0] });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b border-border z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm">Medical Assessment</h3>
            <span className="text-xs text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">What brings you here today?</h2>
                <p className="text-muted-foreground">ما الأعراض التي تعاني منها؟</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Primary Symptoms</Label>
                  <Textarea
                    placeholder="Describe your symptoms..."
                    value={formData.symptoms}
                    onChange={(e) =>
                      setFormData({ ...formData, symptoms: e.target.value })
                    }
                    className="min-h-32 rounded-2xl"
                  />
                </div>

                <Button variant="outline" className="w-full rounded-2xl">
                  <Mic className="w-4 h-4 mr-2" />
                  Use Voice Input
                </Button>

                <div>
                  <Label>Duration</Label>
                  <RadioGroup
                    value={formData.duration}
                    onValueChange={(value) =>
                      setFormData({ ...formData, duration: value })
                    }
                    className="grid grid-cols-2 gap-3 mt-2"
                  >
                    <div className="flex items-center space-x-2 bg-secondary p-4 rounded-2xl cursor-pointer">
                      <RadioGroupItem value="hours" id="hours" />
                      <Label htmlFor="hours" className="cursor-pointer flex-1">
                        Few hours
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-secondary p-4 rounded-2xl cursor-pointer">
                      <RadioGroupItem value="days" id="days" />
                      <Label htmlFor="days" className="cursor-pointer flex-1">
                        Few days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-secondary p-4 rounded-2xl cursor-pointer">
                      <RadioGroupItem value="weeks" id="weeks" />
                      <Label htmlFor="weeks" className="cursor-pointer flex-1">
                        Few weeks
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-secondary p-4 rounded-2xl cursor-pointer">
                      <RadioGroupItem value="months" id="months" />
                      <Label htmlFor="months" className="cursor-pointer flex-1">
                        Months+
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">Pain Assessment</h2>
                <p className="text-muted-foreground">تقييم مستوى الألم</p>
              </div>

              <div className="bg-card rounded-3xl p-8 border border-border">
                <Label className="mb-4 block">
                  Current Pain Level: {painLevel[0]}/10
                </Label>
                <Slider
                  value={painLevel}
                  onValueChange={setPainLevel}
                  max={10}
                  step={1}
                  className="mb-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>No pain</span>
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                  <span>Worst</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Chronic Conditions</Label>
                  <Input
                    placeholder="Diabetes, Hypertension, etc."
                    value={formData.chronicConditions}
                    onChange={(e) =>
                      setFormData({ ...formData, chronicConditions: e.target.value })
                    }
                    className="rounded-2xl"
                  />
                </div>

                <div>
                  <Label>Current Medications</Label>
                  <Input
                    placeholder="List any medications you're taking"
                    value={formData.medications}
                    onChange={(e) =>
                      setFormData({ ...formData, medications: e.target.value })
                    }
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">Dermatology Assessment</h2>
                <p className="text-muted-foreground">فحص الأمراض الجلدية</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Skin Concern Description</Label>
                  <Textarea
                    placeholder="Describe any skin issues, rashes, or concerns..."
                    value={formData.skinConcern}
                    onChange={(e) =>
                      setFormData({ ...formData, skinConcern: e.target.value })
                    }
                    className="min-h-24 rounded-2xl"
                  />
                </div>

                <div className="bg-gradient-to-br from-secondary to-accent/10 rounded-3xl p-8 text-center border-2 border-dashed border-border">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h4 className="mb-2">Upload Skin Images</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI will analyze for dermatological conditions
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFormData({ ...formData, imageUploaded: true })
                    }
                    className="rounded-2xl"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>

                {formData.imageUploaded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card rounded-2xl p-4 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">skin_image_001.jpg</p>
                        <p className="text-xs text-muted-foreground">Uploaded</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">Review & Submit</h2>
                <p className="text-muted-foreground">مراجعة وإرسال</p>
              </div>

              <div className="space-y-3">
                <div className="bg-card rounded-2xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Symptoms</p>
                  <p>{formData.symptoms || "Not provided"}</p>
                </div>
                <div className="bg-card rounded-2xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Pain Level</p>
                  <p>{painLevel[0]}/10</p>
                </div>
                <div className="bg-card rounded-2xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="capitalize">{formData.duration || "Not specified"}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-6 border border-accent/20">
                <p className="text-sm">
                  AI will analyze your information and provide a risk assessment within
                  seconds.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-8">
          <Button
            onClick={handleNext}
            className="w-full bg-primary hover:bg-primary/90 h-14 rounded-2xl"
          >
            {step === totalSteps ? "Submit Assessment" : "Continue"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
