import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Play } from "lucide-react";

const VideoFeed = ({ src, alt, label, isActive = false }) => (
  <div
    className={`relative rounded-lg overflow-hidden bg-card aspect-video border ${
      isActive
        ? "border-primary/20 shadow-lg"
        : "border-border/30 grayscale opacity-80"
    }`}
  >
    <img className="w-full h-full object-cover" src={src} alt={alt} />
    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono text-white flex items-center gap-1">
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      )}
      {label}
    </div>
  </div>
);

const CODE_LINES = [
  {
    num: 1,
    content: (
      <>
        <span className="syntax-keyword">import</span> React{" "}
        <span className="syntax-keyword">from</span>{" "}
        <span className="syntax-string">'react'</span>;
      </>
    ),
  },
  { num: 2, content: "" },
  {
    num: 3,
    content: (
      <>
        <span className="syntax-keyword">export const</span>{" "}
        <span className="syntax-func">DataVisualizer</span> ={" "}
        {"({ data }) => {"}
      </>
    ),
  },
  {
    num: 4,
    content: (
      <>
        &nbsp;&nbsp;<span className="syntax-keyword">const</span> [state,
        setState] = React.useState(<span className="syntax-keyword">null</span>
        );
      </>
    ),
  },
  { num: 5, content: "" },
  {
    num: 6,
    content: (
      <>
        &nbsp;&nbsp;<span className="syntax-keyword">return</span> (
      </>
    ),
  },
  {
    num: 7,
    content: (
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="syntax-func">div</span>{" "}
        className=
        <span className="syntax-string">"p-4 border border-outline"</span>&gt;
      </>
    ),
  },
  {
    num: 8,
    content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{data.map(item => ("}</>,
  },
  {
    num: 9,
    content: (
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
        <span className="syntax-func">Metric</span> key={"{item.id}"} value=
        {"{item.val}"} /&gt;
      </>
    ),
  },
  { num: 10, content: <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"))}"}</> },
  {
    num: 11,
    content: (
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="syntax-func">div</span>
        &gt;
      </>
    ),
  },
  { num: 12, content: <>&nbsp;&nbsp;);</> },
  { num: 13, content: "};" },
];

const SIDEBAR_ICONS = ["code", "chat", "description", "settings"];

const TECH_TAGS = ["REACT", "TS", "FRONTEND_L3"];

const ProductSpotlight = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 md:py-24 px-4 md:px-10 max-w-7xl mx-auto"
    >
      <Card className="overflow-hidden shadow-2xl border-border/30 bg-transparent">
        {/* Terminal header */}
        <div className="terminal-header h-10 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-4 text-xs font-mono text-muted-foreground/60 hidden sm:inline">
              session_id: x7f9_precision_room
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-primary flex items-center gap-1">
              <Lock size={12} />
              ROOM LOCKED
            </span>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              00:42:15
            </span>
          </div>
        </div>

        {/* Main content grid — hidden on mobile, show code editor only */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px]">
          {/* Sidebar — hidden on small screens */}
          <div className="hidden lg:flex col-span-1 border-r border-border/20 flex-col items-center py-6 gap-8 bg-ix-surface-container-low">
            {SIDEBAR_ICONS.map((icon, i) => (
              <span
                key={icon}
                className={`material-symbols-outlined ${i === 0 ? "text-primary" : "text-muted-foreground hover:text-primary cursor-pointer transition-colors"}`}
              >
                {icon}
              </span>
            ))}
          </div>

          {/* Code editor */}
          <div className="lg:col-span-7 bg-ix-surface-container-lowest p-4 md:p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-muted rounded">
                  main.tsx
                </span>
                <span className="text-xs font-mono text-muted-foreground/40 hidden sm:inline">
                  index.css
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="bg-ix-tertiary/20 text-ix-tertiary hover:bg-ix-tertiary/30 text-xs font-mono gap-1.5"
              >
                <Play size={12} />
                Run Tests
              </Button>
            </div>

            {/* Code block */}
            <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
              {CODE_LINES.map((line) => (
                <div key={line.num}>
                  <span className="text-muted-foreground/30 select-none inline-block w-6 text-right mr-4">
                    {line.num}
                  </span>
                  {line.content}
                </div>
              ))}
            </pre>

            {/* Test results overlay */}
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 p-3 md:p-4 glass-panel rounded-lg border-l-4 border-ix-tertiary">
              <div className="flex items-center gap-2 text-ix-tertiary text-xs font-mono mb-1">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                ALL TESTS PASSED
              </div>
              <div className="font-mono text-xs text-muted-foreground leading-relaxed">
                [PASS] DataVisualizer renders correctly with empty array
                <br />
                [PASS] Metric sub-components reflect correct state updates
              </div>
            </div>
          </div>

          {/* Side panel: Video & notes — hidden on small screens */}
          <div className="hidden lg:flex col-span-4 border-l border-border/20 flex-col">
            {/* Video feeds */}
            <div className="p-4 border-b border-border/20 space-y-4">
              <VideoFeed
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXrwYBUo1qTiOcASYNHTpS5MJo3SA0gy2w33OFUv6JtjDLThELtz5eR0tG_b6jehOvEka0xcGYHZkQCTIiQwwvD37v_2A9bQ9XuCPyTbayUevDjONkbzMlgA6fGiI1sJ7oj1AUo4ROrmLUFhQNuBltNIXPbGNiGrfC1UMl4Ui5kEgVpIc5GXR-EM6W1xsV3DCd9huj00J5RePfKt1WaRo1xLNYywciyfqJDC-6kQ6nGlm2z5c5eICdcd9VB3wemtFxWxHe21_3i7I"
                alt="Candidate in video interview"
                label="CANDIDATE: SARAH CHEN"
                isActive
              />
              <VideoFeed
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeoPgTmMLsqyfjUsZPPTy07SOLuarRmWxwJ1m7zsJEbuNOer3dEIzYO7lAIZmvxhglf_zDYUFPARAWyvNno6BQBVIbZyHELsxv7lrujmPWSQ-572ROgCjfIH5QKMHLP26pDf9Y1yOvLsGx0SfLbyddysD_BG-ajOXjTC4KGGcQmLyg0PlDlgzNkdExx8AmGPIpJ1TwSCsJG87SQV-3Ek8IVOuL0b8L6kYTi_H93eliI0fzEalxQ3ECKQqVqw5Jg1kx5AgphzJbJWM"
                alt="Host in video interview"
                label="HOST: DAVID MILLER (YOU)"
              />
            </div>

            {/* Interviewer notes */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Interviewer Notes
              </h4>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded border border-border/30">
                  <p className="text-sm">
                    Candidate demonstrated strong understanding of React hooks
                    and composition patterns. Clean code execution on the first
                    run.
                  </p>
                </div>
                <div className="flex gap-2">
                  {TECH_TAGS.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-primary/20 bg-primary/10 text-primary text-[10px] font-mono"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.section>
  );
};

export default ProductSpotlight;
