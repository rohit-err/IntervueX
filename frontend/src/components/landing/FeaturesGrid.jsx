import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Video,
  Shield,
  Code2,
  BarChart3,
  MessageSquare,
  Lock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Video,
    title: "1-on-1 Video Interview Rooms",
    description:
      "Crystal clear HD video and audio integrated directly into the coding environment.",
    iconClass: "text-primary",
  },
  {
    icon: Shield,
    title: "Secure Execution & Auto-Feedback",
    description:
      "Sandboxed code execution environments with instant test results and feedback.",
    iconClass: "text-ix-secondary",
  },
  {
    icon: Code2,
    title: "Powerful In-Browser Editor",
    description:
      "Vim/Emacs keybindings, multi-cursor support, and intelligent code completion.",
    iconClass: "text-ix-tertiary",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Live Stats",
    description:
      "Track interview progress, candidate performance metrics, and system health live.",
    iconClass: "text-primary",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat",
    description:
      "Instant, low-latency messaging for quick clarifications and data sharing.",
    iconClass: "text-ix-secondary",
  },
  {
    icon: Lock,
    title: "Strict Access Control",
    description:
      "SSO integration, granular RBAC, and end-to-end encryption for session data.",
    iconClass: "text-ix-tertiary",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const FeaturesGrid = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Engineered for Reliability
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Precision tools for high-stakes technical evaluations, hosted on our
          globally distributed, ultra-low latency infrastructure.
        </p>
      </motion.div>

      {/* Feature cards grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} variants={item}>
              <Card className="p-5 md:p-6 flex gap-4 glass-panel border-border/20 hover:border-primary/30 transition-colors group bg-transparent">
                <Icon
                  className={`w-5 h-5 mt-0.5 shrink-0 ${feature.iconClass} group-hover:scale-110 transition-transform`}
                />
                <div>
                  <h4 className="text-sm font-bold font-mono mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default FeaturesGrid;
