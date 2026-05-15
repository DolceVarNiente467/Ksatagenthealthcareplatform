import { motion } from "motion/react";
import { Shield, Fingerprint, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface PatientAuthProps {
  onAuthenticated: () => void;
}

export function PatientAuth({ onAuthenticated }: PatientAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onAuthenticated();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0A2463] to-[#06B6D4] rounded-3xl mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl mb-2">Secure Authentication</h2>
          <p className="text-muted-foreground">تسجيل دخول آمن عبر نفاذ</p>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-2xl">
              <Lock className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="text-sm">Saudi National ID</p>
                <p className="text-xs text-muted-foreground">Nafath Digital Identity</p>
              </div>
            </div>

            {isAuthenticating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Fingerprint className="w-16 h-16 text-primary" />
                </motion.div>
                <p className="text-muted-foreground mt-4">Authenticating...</p>
              </motion.div>
            ) : (
              <Button
                onClick={handleAuth}
                className="w-full bg-primary hover:bg-primary/90 h-14 rounded-2xl"
              >
                <Fingerprint className="w-5 h-5 mr-2" />
                Login with Nafath
              </Button>
            )}

            <div className="text-center text-xs text-muted-foreground">
              <p>Your data is encrypted and secure</p>
              <p className="mt-1">SFDA-compliant healthcare platform</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
