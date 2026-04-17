import Link from "next/link";
import { ArrowRight, BadgeCheck, BrainCircuit, FileSearch, Gauge, Github, Target } from "lucide-react";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const features = [
    { title: "ATS Signal Scan", body: "See whether your resume has the keywords, structure, and proof recruiters expect.", icon: FileSearch },
    { title: "Role Fit Score", body: "Benchmark against frontend, full-stack, backend, internship, React, and Node.js roles.", icon: Target },
    { title: "Project Roadmap", body: "Turn weak signals into portfolio projects with clear skills to prove.", icon: Github },
    { title: "Recruiter Summary", body: "Get the quick read a recruiter would take from your resume in 20 seconds.", icon: BrainCircuit }
];
const steps = ["Upload your PDF", "Pick a target role", "Add LinkedIn or GitHub context", "Ship the action plan"];
export function LandingPage() {
    return (<div className="min-h-screen">
      <MarketingNav />
      <section className="relative min-h-[88vh] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80" alt="Developer workspace with laptop" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-slate-950/72"/>
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-teal-300"/>
              Built for students chasing serious tech roles
            </div>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Know exactly why your resume is not getting callbacks.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl">
              ResumeOS turns a developer resume into a recruiter-ready dashboard with scores,
              missing skills, stronger bullets, project ideas, and a 30-day plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/auth/sign-up">
                  Analyze my resume <ArrowRight className="h-4 w-4"/>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link href="/dashboard">View demo dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mesh-bg border-y py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-primary">Job readiness, decoded</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A practical second brain for your career materials.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (<Card key={feature.title} className="bg-card/85 backdrop-blur">
                <CardHeader>
                  <feature.icon className="h-6 w-6 text-primary"/>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{feature.body}</CardContent>
              </Card>))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">From PDF to action plan in one flow.</h2>
            <p className="mt-4 text-muted-foreground">
              The analysis combines resume text, target role, optional LinkedIn context, and GitHub identity
              into one structured readout.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (<div key={step} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-6 grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{step}</h3>
              </div>))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {["Frontend intern", "CS student", "Bootcamp grad"].map((label) => (<Card key={label}>
                <CardContent className="pt-6">
                  <Gauge className="mb-4 h-6 w-6 text-accent"/>
                  <p className="text-sm text-muted-foreground">
                    “The dashboard made it obvious what to fix before applying.”
                  </p>
                  <p className="mt-4 font-semibold">{label}</p>
                </CardContent>
              </Card>))}
          </div>
        </div>
      </section>

      <footer className="py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>ResumeOS. Built for sharper first impressions.</p>
          <div className="flex gap-4">
            <Link href="/auth/sign-in">Sign in</Link>
            <Link href="/auth/sign-up">Start free</Link>
          </div>
        </div>
      </footer>
    </div>);
}
