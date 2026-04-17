import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AnalysisView } from "@/components/dashboard/analysis-view";
import { getAnalysis, getDashboardData } from "@/lib/data";
export default async function AnalysisPage({ params }) {
    const { id } = await params;
    const [analysis, dashboard] = await Promise.all([getAnalysis(id), getDashboardData()]);
    if (!analysis) {
        notFound();
    }
    return (<AppShell>
      <AnalysisView analysis={analysis} recent={dashboard.analyses.filter((item) => item.id !== id)}/>
    </AppShell>);
}
