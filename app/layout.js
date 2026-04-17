import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata = {
    title: "ResumeOS",
    description: "AI job-readiness dashboard for early-career developers."
};
export default function RootLayout({ children }) {
    return (<html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors position="top-right"/>
        </ThemeProvider>
      </body>
    </html>);
}
