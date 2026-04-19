
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { handleRequest } from "./handlers.ts";
import { corsHeaders } from "../shared/cors.ts";
import { requireUser } from "../shared/auth.ts";

// Main edge function entry point
serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Require authenticated user before doing any work
  const auth = await requireUser(req);
  if (!auth.ok) return auth.response;

  try {
    return await handleRequest(req);
  } catch (error) {
    console.error("Unhandled error in edge function:", error);

    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
