import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-semibold">KHANDLA PARTH</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Frontend Developer
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/khandla-parth-790433228"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:khandlaparth68@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiMail className="h-5 w-5" />
            </a>
            <a
              href="tel:+917984920020"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FiPhone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
