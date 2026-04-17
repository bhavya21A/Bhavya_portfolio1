"use client";
import { useActionState } from "react";
import { toast } from "sonner";
import { updateSettingsAction } from "@/lib/actions/settings";
import { TARGET_ROLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export function SettingsForm({ email, fullName, defaultRole, roastMode }) {
    const [state, action, pending] = useActionState(async (_previousState, formData) => {
        const result = await updateSettingsAction(formData);
        if (result?.success) {
            toast.success("Settings saved.");
        }
        if (result?.error) {
            toast.error(result.error);
        }
        return result;
    }, null);
    return (<Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your account and default resume analysis preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} disabled/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" defaultValue={fullName}/>
          </div>
          <div className="space-y-2">
            <Label>Default target role</Label>
            <Select name="defaultRole" defaultValue={defaultRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TARGET_ROLES.map((role) => (<SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
            <input name="roastMode" type="checkbox" defaultChecked={roastMode} className="h-4 w-4 accent-primary"/>
            Use roast mode by default
          </label>
          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button disabled={pending}>{pending ? "Saving..." : "Save settings"}</Button>
        </form>
      </CardContent>
    </Card>);
}
