import Link from "next/link";
import { Github, Globe, Linkedin } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="text-2xl font-bold">Uber Dashboard Demo</div>
        <nav className="flex items-center gap-4">
          <Link
            href="https://github.com/Konsequanzheng/uber-dashboard-demo/"
            target="_blank"
            className="hover:text-muted-foreground transition-colors"
          >
            <Github className="h-6 w-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/q-zheng"
            target="_blank"
            className="hover:text-muted-foreground transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            href="https://quan.codes"
            target="_blank"
            className="hover:text-muted-foreground transition-colors"
          >
            <Globe className="h-6 w-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
