import Link from "next/link";
import { ArrowUpRight, History } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/data";
import { formatDate } from "@/lib/utils";
export default async function HistoryPage() {
    const { analyses } = await getDashboardData();
    return (<AppShell>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">History</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Past resume analyses</h1>
          <p className="mt-3 text-muted-foreground">Review old results and compare your progress.</p>
        </div>
        <Button asChild>
          <Link href="/upload">New analysis</Link>
        </Button>
      </div>

      {analyses.length === 0 ? (<Card className="text-center">
          <CardContent className="py-14">
            <History className="mx-auto h-10 w-10 text-primary"/>
            <h2 className="mt-4 text-xl font-semibold">No analyses yet</h2>
            <p className="mt-2 text-muted-foreground">Your uploaded resume reports will appear here.</p>
          </CardContent>
        </Card>) : (<div className="grid gap-4">
          {analyses.map((analysis) => (<Link key={analysis.id} href={`/analysis/${analysis.id}`}>
              <Card className="transition-colors hover:bg-muted/35">
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="border-primary/30 bg-primary/10 text-primary">{analysis.target_role}</Badge>
                      <Badge>{formatDate(analysis.created_at)}</Badge>
                    </div>
                    <CardTitle className="mt-3">{analysis.resumes?.file_name || "Resume analysis"}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-3xl font-black">{analysis.overall_score}</p>
                      <p className="text-xs text-muted-foreground">overall</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground"/>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{analysis.recruiter_summary}</p>
                </CardContent>
              </Card>
            </Link>))}
        </div>)}
    </AppShell>);
}
