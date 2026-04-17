import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export function ScoreCard({ label, value, helper }) {
    return (<Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{label}</span>
          <span className="text-3xl font-black">{value}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={value}/>
        <p className="mt-3 text-sm text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>);
}
