import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Zap, Terminal, Check } from "lucide-react";

const WORKFLOWS = [
  {
    icon: ShieldCheck,
    title: "The Host Experience",
    description:
      "Create sessions, invite candidates via secure links, and manage permissions with 'Room Locking' for maximum privacy.",
    features: [
      "Real-time lobby management",
      "Question bank integration",
      "Post-interview report generation",
    ],
    iconBoxClass: "bg-primary/10 group-hover:bg-primary/20",
    iconClass: "text-primary",
    checkClass: "text-primary",
    hoverBorder: "hover:border-primary/40",
  },
  {
    icon: Zap,
    title: "The Candidate Flow",
    description:
      "Zero friction joining. No accounts needed for candidates—just enter the session ID and start coding in a premium environment.",
    features: [
      "One-click join process",
      "Cross-browser compatibility",
      "Integrated IDE shortcuts",
    ],
    iconBoxClass: "bg-ix-secondary/10 group-hover:bg-ix-secondary/20",
    iconClass: "text-ix-secondary",
    checkClass: "text-ix-secondary",
    hoverBorder: "hover:border-ix-secondary/40",
  },
  {
    icon: Terminal,
    title: "Solo Practice",
    description:
      "Sharpen your skills with a vast library of algorithmic problems, automated feedback, and live execution containers.",
    features: [
      "20+ supported languages",
      "Real-world scenario mocks",
      "Progress tracking analytics",
    ],
    iconBoxClass: "bg-ix-tertiary/10 group-hover:bg-ix-tertiary/20",
    iconClass: "text-ix-tertiary",
    checkClass: "text-ix-tertiary",
    hoverBorder: "hover:border-ix-tertiary/40",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};

const WorkflowSection = () => {
  return (
    <section className="py-16 md:py-24 bg-ix-surface-container-lowest">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 md:px-10 grid md:grid-cols-3 gap-6"
      >
        {WORKFLOWS.map((workflow) => {
          const Icon = workflow.icon;
          return (
            <motion.div key={workflow.title} variants={cardVariant}>
              <Card
                className={`group h-full bg-ix-surface-container-low border-border/20 ${workflow.hoverBorder} transition-colors`}
              >
                <CardContent className="p-6 md:p-8">
                  <div
                    className={`w-12 h-12 rounded-lg ${workflow.iconBoxClass} flex items-center justify-center mb-6 transition-colors`}
                  >
                    <Icon className={`w-5 h-5 ${workflow.iconClass}`} />
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold mb-3">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {workflow.description}
                  </p>

                  <ul className="space-y-3">
                    {workflow.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs font-mono text-muted-foreground"
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 ${workflow.checkClass}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default WorkflowSection;
