"use client";

import Link from "next/link";
import { Github, Globe, Linkedin } from "lucide-react";
import TimeButtons from "./timeButtons";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="text-md md:text-2xl font-bold">Uber Dashboard Demo</div>
        <div className="flex flex-row gap-2 md:gap-4">
          <TimeButtons className="hidden md:flex" />
          <nav className="flex items-center gap-2 md:gap-4">
            <Link
              href="https://github.com/Konsequanzheng/uber-dashboard-demo/"
              target="_blank"
              className="hover:text-muted-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/q-zheng/"
              target="_blank"
              className="hover:text-muted-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://quan.codes/"
              target="_blank"
              className="hover:text-muted-foreground transition-colors"
            >
              <Globe className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
