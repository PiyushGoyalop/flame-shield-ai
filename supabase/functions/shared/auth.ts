// Shared auth helper for edge functions.
// Verifies the caller's JWT using Supabase and returns either the authenticated
// user id or a Response that the caller should return immediately.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "./cors.ts";

export interface AuthSuccess {
  ok: true;
  userId: string;
}

export interface AuthFailure {
  ok: false;
  response: Response;
}

export type AuthResult = AuthSuccess | AuthFailure;

function unauthorized(): Response {
  return new Response(
    JSON.stringify({ error: "Unauthorized" }),
    {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

export async function requireUser(req: Request): Promise<AuthResult> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { ok: false, response: unauthorized() };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return { ok: false, response: unauthorized() };
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !anonKey) {
    console.error("Auth misconfigured: SUPABASE_URL or SUPABASE_ANON_KEY missing");
    return { ok: false, response: unauthorized() };
  }

  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return { ok: false, response: unauthorized() };
    }
    return { ok: true, userId: data.user.id };
  } catch (err) {
    console.error("Auth verification error:", err);
    return { ok: false, response: unauthorized() };
  }
}
