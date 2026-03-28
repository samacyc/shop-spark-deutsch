import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action, adminPassword } = body;

    if (!adminPassword || adminPassword !== Deno.env.get("ADMIN_PASSWORD")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    switch (action) {
      case "get_customers": {
        const { data, error } = await supabase
          .from("customers")
          .select("*, transactions(*)")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return new Response(JSON.stringify({ customers: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "get_credentials": {
        const { data, error } = await supabase
          .from("paypal_credentials")
          .select("*")
          .limit(1)
          .single();
        if (error) throw error;
        // Mask secret for display
        const masked = {
          ...data,
          client_secret: data.client_secret
            ? data.client_secret.substring(0, 6) + "..." + data.client_secret.slice(-4)
            : "",
        };
        return new Response(JSON.stringify({ credentials: masked }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "update_credentials": {
        const { clientId, clientSecret, viteClientId, isSandbox } = body;
        // Get existing row id
        const { data: existing } = await supabase
          .from("paypal_credentials")
          .select("id")
          .limit(1)
          .single();

        if (!existing) throw new Error("No credentials row found");

        const updateData: any = {};
        if (clientId !== undefined) updateData.client_id = clientId;
        if (clientSecret !== undefined) updateData.client_secret = clientSecret;
        if (viteClientId !== undefined) updateData.vite_client_id = viteClientId;
        if (isSandbox !== undefined) updateData.is_sandbox = isSandbox;

        const { error } = await supabase
          .from("paypal_credentials")
          .update(updateData)
          .eq("id", existing.id);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "get_transactions": {
        const { data, error } = await supabase
          .from("transactions")
          .select("*, customers(name, email)")
          .order("created_at", { ascending: false })
          .limit(100);
        if (error) throw error;
        return new Response(JSON.stringify({ transactions: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (err) {
    console.error("Admin API error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
