import { motion } from "motion/react";
import {
  Bell,
  FileText,
  Calendar,
  Activity,
  Clock,
  ChevronRight,
  Pill,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface PatientDashboardProps {
  onNewAssessment: () => void;
}

export function PatientDashboard({ onNewAssessment }: PatientDashboardProps) {
  const notifications = [
    {
      id: 1,
      type: "report",
      title: "Medical Report Issued",
      message:
        "Dr. Ahmed Al-Rashid has issued your final medical report and recommendations.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "prescription",
      title: "Prescription Issued",
      message:
        "Your physician has prescribed medications. View details in the Prescriptions tab.",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "appointment",
      title: "Follow-up Scheduled",
      message: "Follow-up consultation scheduled for May 25, 2026 at 2:30 PM",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 4,
      type: "info",
      title: "Case Under Review",
      message: "Your case has been assigned to Dr. Ahmed Al-Rashid for review.",
      time: "1 day ago",
      unread: false,
    },
  ];

  const reports = [
    {
      id: 1,
      title: "Contact Dermatitis - Clinical Report",
      doctor: "Dr. Ahmed Al-Rashid, General Practitioner",
      date: "May 14, 2026",
      status: "Final Report",
      diagnosis: "Contact Dermatitis (L25.9)",
    },
    {
      id: 2,
      title: "Treatment Plan & Follow-up Instructions",
      doctor: "Dr. Ahmed Al-Rashid, General Practitioner",
      date: "May 14, 2026",
      status: "Active",
      diagnosis: "Ongoing Care",
    },
    {
      id: 3,
      title: "Previous Assessment - Allergic Reaction",
      doctor: "Dr. Sarah Al-Mutairi, General Practitioner",
      date: "May 10, 2026",
      status: "Resolved",
      diagnosis: "Mild Allergic Reaction",
    },
  ];

  const prescriptions = [
    {
      id: 1,
      medication: "Hydrocortisone Cream 1%",
      dosage: "Apply twice daily",
      duration: "14 days",
      doctor: "Dr. Ahmed Al-Rashid",
    },
    {
      id: 2,
      medication: "Vitamin D Supplement",
      dosage: "1000 IU daily",
      duration: "30 days",
      doctor: "Dr. Ahmed Al-Rashid",
    },
  ];

  const appointments = [
    {
      id: 1,
      type: "Laboratory Test",
      location: "King Faisal Hospital - Lab Building",
      date: "May 18, 2026",
      time: "9:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      type: "Follow-up Visit",
      location: "KSAT Medical Center",
      date: "May 25, 2026",
      time: "2:30 PM",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl mb-1">Welcome back</h1>
            <p className="text-white/80">مرحباً بعودتك</p>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full border-2 border-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <Activity className="w-8 h-8 mb-2" />
            <p className="text-sm text-white/80">Assessments</p>
            <p className="text-2xl">12</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <Calendar className="w-8 h-8 mb-2" />
            <p className="text-sm text-white/80">Appointments</p>
            <p className="text-2xl">2</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-4 mb-6 border border-primary/10">
          <p className="text-xs text-center text-muted-foreground">
            All medical reports and recommendations are reviewed and approved by licensed physicians
          </p>
        </div>

        <Button
          onClick={onNewAssessment}
          className="w-full bg-primary hover:bg-primary/90 h-14 rounded-2xl mb-6"
        >
          Start New Assessment
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="prescriptions">Rx</TabsTrigger>
            <TabsTrigger value="appointments">Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-3">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-card rounded-2xl p-4 border ${
                  notification.unread
                    ? "border-accent bg-accent/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    {notification.type === "prescription" && (
                      <Pill className="w-5 h-5 text-primary" />
                    )}
                    {notification.type === "appointment" && (
                      <Calendar className="w-5 h-5 text-primary" />
                    )}
                    {notification.type === "report" && (
                      <FileText className="w-5 h-5 text-primary" />
                    )}
                    {notification.type === "info" && (
                      <Activity className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm">{notification.title}</h4>
                      {notification.unread && (
                        <Badge
                          variant="secondary"
                          className="bg-accent text-white text-xs"
                        >
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="space-y-3">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-4 border border-border"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-1">{report.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">
                      {report.doctor}
                    </p>
                    <p className="text-xs text-primary mb-2">{report.diagnosis}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {report.date}
                      </span>
                      <Badge
                        variant="secondary"
                        className={
                          report.status === "Final Report"
                            ? "bg-[#22C55E]/10 text-[#22C55E]"
                            : report.status === "Active"
                            ? "bg-[#06B6D4]/10 text-[#06B6D4]"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-3">
            {prescriptions.map((prescription) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-4 border border-border"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-2">{prescription.medication}</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Dosage: {prescription.dosage}</p>
                      <p>Duration: {prescription.duration}</p>
                      <p>Prescribed by: {prescription.doctor}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="appointments" className="space-y-3">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-4 border border-border"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm">{appointment.type}</h4>
                      <Badge
                        variant="secondary"
                        className={
                          appointment.status === "Confirmed"
                            ? "bg-[#22C55E]/10 text-[#22C55E]"
                            : "bg-[#EAB308]/10 text-[#EAB308]"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>{appointment.location}</p>
                      <p>
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
