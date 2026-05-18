import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = ["Terms", "Privacy", "Security", "Contact"];

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/30 bg-ix-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-black text-foreground">IntervueX</span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IntervueX. Built for Engineering
            Precision.
          </p>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          {FOOTER_LINKS.map((link, i) => (
            <Fragment key={link}>
              <a
                href="#"
                className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                {link}
              </a>
              {i < FOOTER_LINKS.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="h-3 hidden md:block"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
