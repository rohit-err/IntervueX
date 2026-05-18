import { motion } from "framer-motion";
import { SignUpButton } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Keyboard } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl"
      >
        {/* Version badge */}
        <motion.div variants={item} className="mb-8">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/10 text-primary font-mono text-xs tracking-wider gap-2 px-3 py-1"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            v2.4.0 ENGINE LIVE
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6"
        >
          Engineering Precision for Every{" "}
          <span className="text-primary">Technical Interview</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The only platform combining real-time video, collaborative coding, and
          secure execution in one frictionless environment. Built for elite
          engineering teams.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-5 text-sm font-bold glow-blue-hover transition-all gap-2"
            >
              Create Interview Session
              <ArrowRight size={16} />
            </Button>
          </SignUpButton>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-5 text-sm font-medium gap-2 border-border hover:border-primary/50 transition-all"
          >
            Join with Code
            <Keyboard size={16} />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
