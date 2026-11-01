import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Showtemplates from "@/components/Showtemplates";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUser } from "@clerk/nextjs";
import {
  Cloud,
  Zap,
  Layers,
  Code2,
  Rocket,
  Globe,
  ShieldCheck,
  BarChart3,
  Box,
  Plus,
  LayoutDashboard,
} from "lucide-react";

const ICON_MAP = {
  rocket: <Rocket size={24} strokeWidth={2} />,
  zap: <Zap size={24} strokeWidth={2} />,
  layers: <Layers size={24} strokeWidth={2} />,
  code: <Code2 size={24} strokeWidth={2} />,
  globe: <Globe size={24} strokeWidth={2} />,
  shield: <ShieldCheck size={24} strokeWidth={2} />,
  chart: <BarChart3 size={24} strokeWidth={2} />,
  cube: <Box size={24} strokeWidth={2} />,
};

const ICON_COLORS = {
  rocket: "text-orange-500",
  zap: "text-yellow-500",
  layers: "text-purple-500",
  code: "text-blue-500",
  globe: "text-indigo-500",
  shield: "text-green-500",
  chart: "text-pink-500",
  cube: "text-red-500",
};

export default function Home() {
  const heroRef = useRef(null);
  const heroGlowRef = useRef(null);
  const heroOrbRef = useRef(null);
  const heroIconRef = useRef(null);
  const heroCopyRef = useRef(null);
  const [templateCount, setTemplateCount] = useState(0);
  const { user, isLoaded } = useUser();
  const isSignedIn = isLoaded && !!user;

  useEffect(() => {
    let active = true;

    axios.get("/api/template")
      .then((response) => {
        if (active && Array.isArray(response.data)) {
          setTemplateCount(response.data.length);
        }
      })
      .catch((error) => {
        console.error("Unable to load template count:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const heroTl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });
      if (!reduceMotion) heroTl
        .from("[data-hero-line]", {
          yPercent: 100,
          opacity: 0,
          stagger: 0.15,
        })
        .from("[data-hero-sub]", { y: 30, opacity: 0 }, "-=0.5")
        .from("[data-hero-cta]", { y: 30, opacity: 0, scale: 0.9 }, "-=0.4")
        .from("[data-hero-icon]", {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        }, "-=0.6");

      if (!reduceMotion) {
        gsap.to("[data-hero-ring]", {
          rotation: 360,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      }

      // A page can be opened at a hash, restored at a previous scroll
      // position, or hydrated after the section has already crossed its
      // trigger. In those cases gsap.from used to leave the content at its
      // hidden starting state. Only create a reveal for sections below the
      // current viewport; sections already visible are explicitly left
      // visible.
      const reveal = (selector, triggerSelector, distance, duration, stagger) => {
        const elements = gsap.utils.toArray(selector);
        const trigger = document.querySelector(triggerSelector);

        if (!elements.length || !trigger || reduceMotion) {
          gsap.set(elements, { clearProps: "opacity,transform" });
          return;
        }

        if (trigger.getBoundingClientRect().top <= window.innerHeight * 0.85) {
          gsap.set(elements, { opacity: 1, y: 0 });
          return;
        }

        gsap.from(elements, {
          immediateRender: false,
          scrollTrigger: {
            trigger,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: distance,
          opacity: 0,
          duration,
          stagger,
          ease: "power3.out",
        });
      };

      reveal("[data-stat-card]", "[data-stats-section]", 50, 0.8, 0.12);
      reveal("[data-feature-card]", "[data-features-section]", 50, 0.8, 0.15);
      reveal("[data-showcase-item]", "[data-showcase-section]", 50, 0.8, 0.1);
      reveal("[data-cta-el]", "[data-cta-section]", 40, 0.7, 0.1);
    });

    // Pointer-reactive hero motion. This stays local to the hero and does not
    // update React state on every pointer event.
    const hero = heroRef.current;
    const glow = heroGlowRef.current;
    const orb = heroOrbRef.current;
    const icon = heroIconRef.current;
    const copy = heroCopyRef.current;
    let handlePointerMove;
    let handlePointerLeave;

    if (!reduceMotion && hero && glow && orb && icon && copy) {
      const moveGlowX = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power3.out" });
      const moveGlowY = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power3.out" });
      const moveOrbX = gsap.quickTo(orb, "x", { duration: 0.7, ease: "power3.out" });
      const moveOrbY = gsap.quickTo(orb, "y", { duration: 0.7, ease: "power3.out" });
      const tiltIconX = gsap.quickTo(icon, "rotationY", { duration: 0.55, ease: "power3.out" });
      const tiltIconY = gsap.quickTo(icon, "rotationX", { duration: 0.55, ease: "power3.out" });
      const tiltCopyX = gsap.quickTo(copy, "rotationY", { duration: 0.6, ease: "power3.out" });
      const tiltCopyY = gsap.quickTo(copy, "rotationX", { duration: 0.6, ease: "power3.out" });

      handlePointerMove = (event) => {
        if (event.pointerType === "touch") return;

        const bounds = hero.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const normalizedX = x / bounds.width - 0.5;
        const normalizedY = y / bounds.height - 0.5;

        moveGlowX(normalizedX * 180);
        moveGlowY(normalizedY * 130);
        moveOrbX(normalizedX * -34);
        moveOrbY(normalizedY * -24);
        tiltIconX(normalizedX * 16);
        tiltIconY(normalizedY * -12);
        tiltCopyX(normalizedX * 2.2);
        tiltCopyY(normalizedY * -1.4);
      };

      handlePointerLeave = () => {
        moveGlowX(0);
        moveGlowY(0);
        moveOrbX(0);
        moveOrbY(0);
        tiltIconX(0);
        tiltIconY(0);
        tiltCopyX(0);
        tiltCopyY(0);
      };

      hero.addEventListener("pointermove", handlePointerMove, { passive: true });
      hero.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      if (hero && handlePointerMove) hero.removeEventListener("pointermove", handlePointerMove);
      if (hero && handlePointerLeave) hero.removeEventListener("pointerleave", handlePointerLeave);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const numberElements = document.querySelectorAll("[data-stat-number]");
    const animations = [];

    numberElements.forEach((element) => {
      const target = Number(element.dataset.statTarget || 0);

      if (reduceMotion) {
        element.textContent = target.toLocaleString();
        return;
      }

      const counter = { value: 0 };
      const animation = gsap.to(counter, {
        value: target,
        duration: 1.4,
        delay: 0.15,
        ease: "power2.out",
        snap: { value: 1 },
        scrollTrigger: {
          trigger: "[data-stats-section]",
          start: "top 82%",
          once: true,
        },
        onUpdate: () => {
          element.textContent = Math.round(counter.value).toLocaleString();
        },
      });

      animations.push(animation);
    });

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [templateCount]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Background animation container */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Animated gradient mesh blobs */}
        <div className="absolute left-[-20%] top-[-20%] h-[600px] w-[600px] rounded-full bg-green-500/10 blur-[128px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[128px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-red-500/10 blur-[96px] animate-pulse-slow" style={{ animationDelay: "4s" }}></div>
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border)/.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/.35)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

        {/* Decorative border corners */}
        <div className="pointer-events-none absolute inset-0 border border-border/20" />
      </div>

      <main
        ref={heroRef}
        className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:pt-32"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            ref={heroGlowRef}
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96"
          />
          <div
            ref={heroOrbRef}
            data-hero-orb
            className="absolute left-[12%] top-[22%] h-3 w-3 rounded-full bg-green-400 shadow-[0_0_32px_8px_rgba(74,222,128,.35)] sm:left-[22%]"
          />
          <div className="absolute right-[12%] top-[30%] h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_24px_6px_rgba(129,140,248,.35)] sm:right-[24%]" />
          <div
            data-hero-ring
            className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 sm:h-[30rem] sm:w-[30rem]"
          />
        </div>

        <div ref={heroCopyRef} data-hero-copy className="relative z-10 mx-auto max-w-5xl text-center [transform-style:preserve-3d]">
          <span
            data-hero-line
            className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-sm"
          >
            <Cloud size={14} strokeWidth={2} />
            Developer Templates for Modern Projects
          </span>
          <h1
            data-hero-line
            className="mb-8 text-4xl font-black leading-[1.05] tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl"
          >
            Build faster with{" "}
            <span className="relative block bg-gradient-to-r from-green-500 via-indigo-500 to-red-500 bg-clip-text text-transparent">
              premium code templates
            </span>
          </h1>
          <div ref={heroIconRef} data-hero-icon className="relative z-10 mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur [transform-style:preserve-3d]">
            <Box size={40} strokeWidth={2.5} className="text-primary" />
          </div>
          <p
            data-hero-sub
            className="mx-auto mb-10 max-w-[65ch] text-base leading-relaxed text-muted-foreground sm:mb-12 sm:text-lg md:text-xl"
          >
            Curated, production-ready templates crafted by developers for
            developers. Skip the boilerplate and ship your next project in
            minutes, not weeks.
          </p>
          <div data-hero-cta className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
            {isSignedIn ? (
              <>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full border-0 px-8 py-4 text-base font-bold shadow-lg shadow-primary/25 transition-[transform,box-shadow] hover:scale-105 hover:shadow-primary/35 sm:w-auto sm:px-10 sm:text-lg"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard size={18} className="mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border border-primary px-8 py-4 text-base font-bold transition-colors hover:bg-primary/5 sm:w-auto sm:px-10 sm:text-lg"
                >
                  <Link href="/dashboard/projects/new">
                    <Plus size={18} className="mr-2" />
                    + Upload Template
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full border-0 px-8 py-4 text-base font-bold shadow-lg shadow-primary/25 transition-[transform,box-shadow] hover:scale-105 hover:shadow-primary/35 sm:w-auto sm:px-10 sm:text-lg"
                >
                  <Link href="/login">Get started free</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border border-border px-8 py-4 text-base font-bold transition-colors hover:bg-muted sm:w-auto sm:px-10 sm:text-lg"
                >
                  <Link href="#featured-templates">Browse templates</Link>
                </Button>
              </>
            )}
          </div>
        </div>


      </main>

      {/* Stats / Data cards section */}
      <section
        data-stats-section
        className="py-24 border-y border-border/50 bg-background relative overflow-hidden"
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/.35)_1px,transparent_1px)] [background-size:4rem_4rem] opacity-40 pointer-events-none" />
        <div className="mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for scale
            </h2>
            <p className="text-muted-foreground max-w-[55ch] mx-auto">
              Join thousands of developers shipping faster with battle-tested
              templates.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: templateCount, suffix: "", label: "Code snippets published", icon: "rocket" },
              { value: 100, suffix: "+", label: "Active developers", icon: "zap" },
              { value: 85, suffix: "+", label: "Frameworks supported", icon: "layers" },
              { value: 24, suffix: "+", label: "Integrations ready", icon: "cube" },
            ].map((stat, i) => (
              <div
                key={i}
                data-stat-card
                className="bg-card border border-border rounded-[1.5rem] p-6 text-center hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 ${ICON_COLORS[stat.icon]}`}
                >
                  {ICON_MAP[stat.icon]}
                </div>
                <div className="mb-2 text-3xl font-black md:text-4xl">
                  <span data-stat-number data-stat-target={stat.value}>0</span>{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section
        data-features-section
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]"></div>
        </div>
        <div className="mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Why choose our templates?
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-[50ch]">
                  Every template is reviewed for code quality, accessibility,
                  and real-world performance. No fluff, no bloat — just clean,
                  production-ready code.
                </p>
              </div>
              <ul className="space-y-5 mt-8">
                {[
                  ["Production-ready code", "Audit-ready, accessible, and performant out of the box.", "shield"],
                  ["Framework agnostic", "Next.js, React, Vue, and plain HTML versions available.", "globe"],
                  ["Responsive by design", "Mobile-first layouts that work on every screen size.", "layers"],
                  ["Regular updates", "New templates added weekly with security patches.", "zap"],
                ].map(([title, desc, iconKey], i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 mt-0.5 ${ICON_COLORS[iconKey]}`}>
                      {ICON_MAP[iconKey]}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Instant setup",
                    desc: "Clone, install, and deploy in under 5 minutes.",
                    icon: "rocket",
                  },
                  {
                    title: "Customizable",
                    desc: "Tailwind-based styling that adapts to your brand.",
                    icon: "layers",
                  },
                  {
                    title: "Type-safe",
                    desc: "Full TypeScript support with strict type checking.",
                    icon: "code",
                  },
                  {
                    title: "SEO optimized",
                    desc: "Built with best practices for search visibility.",
                    icon: "chart",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    data-feature-card
                    className="bg-card border border-border rounded-[1.5rem] p-6 hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors text-3xl">
                      {ICON_MAP[feature.icon]}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates showcase */}
      <section
        id="featured-templates"
        data-showcase-section
        className="py-24 border-t border-border/50 bg-background/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[128px]"></div>
        </div>
        <div className="mx-auto px-6 max-w-[1400px] relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Featured templates
              </h2>
              <p className="text-muted-foreground mt-2">
                Hand-picked templates ready for your next project.
              </p>
            </div>
            <Link
              href="/templates"
              className="text-sm font-semibold text-primary hover:underline flex items-center gap-2"
            >
              View all <Zap size={16} strokeWidth={2} />
            </Link>
          </div>
          <Showtemplates />
        </div>
      </section>

      {/* Final CTA */}
      <section
        data-cta-section
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-primary/10 rounded-full blur-[128px]"></div>
        </div>
        <div className="mx-auto px-6 max-w-3xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-xs font-bold mb-8 border border-green-500/20">
            <span>New templates added weekly</span>
          </div>
          <h2 data-cta-el className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Ready to ship your next project?
          </h2>
          <p data-cta-el className="text-muted-foreground text-lg mb-12 max-w-[50ch] mx-auto leading-relaxed">
            Get instant access to the full template library and start building
            today.
          </p>
          <div data-cta-el className="flex flex-col sm:flex-row items-center justify-center gap-5">
            {isSignedIn ? (
              <>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-12 py-5 font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all border-0"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard size={20} className="mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-12 py-5 font-bold text-lg transition-all border-primary hover:bg-primary/5"
                >
                  <Link href="/dashboard/projects/new">
                    <Plus size={20} className="mr-2" />
                    + Upload Template
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-12 py-5 font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all border-0"
                >
                  <Link href="/login">Get started free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
