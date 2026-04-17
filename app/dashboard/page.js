import Link from "next/link";
import { FileUp } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { AnalysisView } from "@/components/dashboard/analysis-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardData } from "@/lib/data";
export default async function DashboardPage() {
    const { analyses } = await getDashboardData();
    const latest = analyses[0];
    return (<AppShell>
      {!latest ? (<Card className="mx-auto max-w-2xl text-center">
          <CardHeader>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-md bg-primary/10 text-primary">
              <FileUp className="h-7 w-7"/>
            </div>
            <CardTitle className="text-2xl">Upload your first resume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mx-auto max-w-md text-muted-foreground">
              ResumeOS will parse your PDF, score it for your target role, and create a practical improvement plan.
            </p>
            <Button asChild className="mt-6">
              <Link href="/upload">Start analysis</Link>
            </Button>
          </CardContent>
        </Card>) : (<AnalysisView analysis={latest} recent={analyses.slice(1)}/>)}
    </AppShell>);
}
