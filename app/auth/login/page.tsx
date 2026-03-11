"use client";

import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useAuth } from "@/app/_context/AuthContext";
import { createClient } from "@/app/_lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("nthgisreal@gmail.com");
  const [password, setPassword] = useState("real123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data);
      router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Sign In failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>

          {error && <div className="p-3 text-red-500">{error}</div>}

          <Button type="submit" className="bg-primary-500 cursor-pointer">
            {loading ? "logging in" : "Login"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

export default LoginPage;
