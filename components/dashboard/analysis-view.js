import Link from "next/link";
import { ArrowUpRight, CalendarDays, CheckCircle2, Download, Share2, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScoreCard } from "@/components/dashboard/score-card";
import { formatDate } from "@/lib/utils";
export function AnalysisView({ analysis, recent = [] }) {
    const data = analysis.analysis;
    return (<div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-primary/30 bg-primary/10 text-primary">{analysis.target_role}</Badge>
            <Badge>{formatDate(analysis.created_at)}</Badge>
            {analysis.roast_mode && <Badge className="border-accent/30 bg-accent/10 text-accent">Roast mode</Badge>}
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Job-readiness dashboard</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">{data.recruiter_summary}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/upload">New analysis</Link>
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4"/>
            Share card
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ScoreCard label="Overall" value={data.overall_score} helper="Total recruiter readiness."/>
        <ScoreCard label="ATS" value={data.ats_score} helper="Keyword and formatting strength."/>
        <Card>
          <CardHeader>
            <CardTitle>Missing skills</CardTitle>
            <CardDescription>Highest-value gaps</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {data.missing_skills.slice(0, 8).map((skill) => (<Badge key={skill}>{skill}</Badge>))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resume file</CardTitle>
            <CardDescription>{analysis.resumes?.file_name || "Uploaded PDF"}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4"/>
              Report PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SignalPanel title="Strongest signals" icon="good" items={data.strengths}/>
        <SignalPanel title="Weak points" icon="warn" items={data.weaknesses}/>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Rewritten resume bullets</CardTitle>
            <CardDescription>Sharper proof for recruiter skim time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.rewritten_bullet_points.map((bullet) => (<div key={bullet} className="rounded-md border bg-muted/40 p-4 text-sm">
                {bullet}
              </div>))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skill coverage</CardTitle>
            <CardDescription>Turn gaps into proof.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.missing_skills.slice(0, 6).map((skill, index) => (<div key={skill}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{skill}</span>
                  <span className="text-muted-foreground">{Math.max(28, 78 - index * 8)}%</span>
                </div>
                <Progress value={Math.max(28, 78 - index * 8)}/>
              </div>))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suggested projects</CardTitle>
          <CardDescription>Portfolio work that proves the missing signals.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {data.suggested_projects.map((project) => (<div key={project.title} className="rounded-lg border bg-background p-5">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills_proven.map((skill) => (<Badge key={skill} className="bg-primary/10 text-primary">
                    {skill}
                  </Badge>))}
              </div>
            </div>))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>30-day action plan</CardTitle>
            <CardDescription>Four weeks of focused improvements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data["30_day_action_plan"].map((week) => (<div key={week.week} className="grid gap-3 rounded-lg border bg-background p-4 sm:grid-cols-[130px_1fr]">
                <div>
                  <p className="font-semibold">{week.week}</p>
                  <p className="text-sm text-primary">{week.focus}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {week.actions.map((action) => (<li key={action} className="flex gap-2">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>
                      {action}
                    </li>))}
                </ul>
              </div>))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent analyses</CardTitle>
            <CardDescription>Track progress over time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.length === 0 && <p className="text-sm text-muted-foreground">Your next analyses will appear here.</p>}
            {recent.map((item) => (<Link key={item.id} href={`/analysis/${item.id}`} className="flex items-center justify-between rounded-md border p-3 text-sm transition-colors hover:bg-muted">
                <span>
                  <span className="block font-medium">{item.target_role}</span>
                  <span className="text-muted-foreground">{formatDate(item.created_at)}</span>
                </span>
                <span className="flex items-center gap-2 font-bold">
                  {item.overall_score}
                  <ArrowUpRight className="h-4 w-4"/>
                </span>
              </Link>))}
          </CardContent>
        </Card>
      </div>
    </div>);
}
function SignalPanel({ title, items, icon }) {
    const Icon = icon === "good" ? CheckCircle2 : TriangleAlert;
    return (<Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (<div key={item} className="flex gap-3 rounded-md bg-muted/50 p-3 text-sm">
            <Icon className={icon === "good" ? "h-5 w-5 shrink-0 text-primary" : "h-5 w-5 shrink-0 text-accent"}/>
            {item}
          </div>))}
      </CardContent>
    </Card>);
}
