"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    return (<Button type="button" variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(isDark ? "light" : "dark")}>
      <Sun className="h-4 w-4 scale-100 dark:scale-0"/>
      <Moon className="absolute h-4 w-4 scale-0 dark:scale-100"/>
    </Button>);
}
