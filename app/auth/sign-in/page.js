import { AuthCard } from "@/components/auth/auth-card";
import { MarketingNav } from "@/components/layout/marketing-nav";
export default async function SignInPage({ searchParams }) {
    const params = await searchParams;
    return (<div className="min-h-screen mesh-bg">
      <MarketingNav />
      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center px-4 py-12">
        <AuthCard mode="sign-in" next={params.next}/>
      </main>
    </div>);
}
