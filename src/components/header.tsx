"use client";

import Link from "next/link";
import { Github, Globe, Linkedin } from "lucide-react";
import TimeButtons from "./timeButtons";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const links = [
    {
      href: "/network-map",
      name: "Network Map",
    },
    {
      href: "/public-transit",
      name: "Public Transit",
    },
  ];

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex flex-row gap-4 items-center">
          <div className="text-md md:text-2xl font-bold">
            Uber Dashboard Demo
          </div>
          {links.map(({ href, name }) => {
            return (
              <Link
                href={href}
                key={href}
                className={`${pathname == href && "underline font-semibold"}`}
              >
                {name}
              </Link>
            );
          })}
        </div>
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
