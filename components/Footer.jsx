import React from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Cloud, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 text-foreground transition-colors">
      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 text-primary font-bold tracking-tight"
            >
              <Badge className="h-9 w-9 rounded-lg p-0">
                <Cloud width={24} height={24} />
              </Badge>
              <span className="text-xl font-bold tracking-tight">CodeSnap</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Production-ready web templates and boilerplates for modern developers.
              Ship robust full-stack applications in minutes with clean code and best practices.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#featured-templates" className="hover:text-foreground transition-colors">
                  Featured Templates
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/projects/new" className="hover:text-foreground transition-colors">
                  Upload Template
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Github size={16} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Twitter size={16} /> Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CodeSnap. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, Tailwind CSS & Clerk
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
