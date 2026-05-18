import { motion } from "framer-motion";
import { SignUpButton } from "@clerk/react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 text-center bg-primary/5 border-y border-primary/20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
          Ready to elevate your engineering assessments?
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Join the world's most precise engineering teams and start conducting
          interviews that truly reflect candidate skill.
        </p>
        <SignUpButton mode="modal">
          <Button
            size="lg"
            className="px-10 py-5 text-base font-extrabold glow-blue-hover hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Get Started for Free
          </Button>
        </SignUpButton>
      </motion.div>
    </section>
  );
};

export default CTASection;
