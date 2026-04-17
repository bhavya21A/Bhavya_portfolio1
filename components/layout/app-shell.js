import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart3, FileUp, History, LogOut, Settings, Sparkles } from "lucide-react";
import { signOutAction } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
const nav = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/upload", label: "Upload", icon: FileUp },
    { href: "/history", label: "History", icon: History },
    { href: "/settings", label: "Settings", icon: Settings }
];
export async function AppShell({ children }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/auth/sign-in");
    }
    return (<div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4"/>
            </span>
            ResumeOS
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (<Button key={item.href} asChild variant="ghost">
                <Link href={item.href}>
                  <item.icon className="h-4 w-4"/>
                  {item.label}
                </Link>
              </Button>))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <form action={signOutAction}>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4"/>
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </form>
          </div>
        </div>
        <nav className="grid grid-cols-4 gap-1 border-t px-2 py-2 md:hidden">
          {nav.map((item) => (<Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 rounded-md px-2 py-2 text-xs text-muted-foreground">
              <item.icon className="h-4 w-4"/>
              {item.label}
            </Link>))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>);
}
