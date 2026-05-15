import { motion } from "motion/react";
import { Activity, Shield, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface PatientSplashProps {
  onContinue: () => void;
}

export function PatientSplash({ onContinue }: PatientSplashProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2463] via-[#0D3B7A] to-[#06B6D4] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-3xl mb-6">
            <Activity className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl text-white mb-3">KSAT Agent</h1>
          <div className="flex items-center justify-center gap-2 text-[#06B6D4] mb-2">
            <Sparkles className="w-4 h-4" />
            <p className="text-lg">AI-Powered Smart Medical Triage</p>
          </div>
          <p className="text-white/70 text-sm">وكيل تصنيف طبي ذكي</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
            <Shield className="w-6 h-6 text-[#06B6D4] flex-shrink-0" />
            <div>
              <p className="text-white text-sm">Secure & SFDA Compliant</p>
              <p className="text-white/60 text-xs">Enterprise-grade healthcare</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={onContinue}
            className="w-full bg-white text-[#0A2463] hover:bg-white/90 h-14 rounded-2xl text-lg"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
