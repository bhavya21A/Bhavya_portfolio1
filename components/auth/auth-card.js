"use client";
import Link from "next/link";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { signInAction, signUpAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export function AuthCard({ mode, next }) {
    const action = mode === "sign-in" ? signInAction : signUpAction;
    const [state, formAction, pending] = useActionState(async (_previousState, formData) => action(formData), null);
    const isSignIn = mode === "sign-in";
    return (<Card className="w-full max-w-md shadow-panel">
      <CardHeader>
        <CardTitle>{isSignIn ? "Welcome back" : "Create your account"}</CardTitle>
        <CardDescription>
          {isSignIn ? "Sign in to view your resume dashboard." : "Start your first resume analysis."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {!isSignIn && (<div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" name="fullName" placeholder="Maya Sharma" required/>
            </div>)}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" minLength={6} required/>
          </div>
          <input type="hidden" name="next" value={next || "/dashboard"}/>
          {state?.error && (<p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>)}
          <Button className="w-full" disabled={pending}>
            {pending && <Loader2 className="h-4 w-4 animate-spin"/>}
            {isSignIn ? "Sign in" : "Create account"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isSignIn ? "New to ResumeOS?" : "Already have an account?"}{" "}
          <Link className="font-semibold text-primary" href={isSignIn ? "/auth/sign-up" : "/auth/sign-in"}>
            {isSignIn ? "Create account" : "Sign in"}
          </Link>
        </p>
      </CardContent>
    </Card>);
}
