import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function getPayPalCredentials(supabase: any) {
  const { data, error } = await supabase
    .from("paypal_credentials")
    .select("*")
    .limit(1)
    .single();
  if (error || !data) throw new Error("PayPal credentials not configured");
  return data;
}

async function getPayPalAccessToken(clientId: string, clientSecret: string, isSandbox: boolean) {
  const base = isSandbox
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`PayPal auth failed: ${JSON.stringify(json)}`);
  return { accessToken: json.access_token, baseUrl: base };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { amount, name, email, addressLine1, addressLine2, city, postalCode, quantity, returnUrl, cancelUrl } = await req.json();

    if (!amount || !name || !email || !returnUrl || !cancelUrl) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const creds = await getPayPalCredentials(supabase);
    const { accessToken, baseUrl } = await getPayPalAccessToken(
      creds.client_id,
      creds.client_secret,
      creds.is_sandbox
    );

    // Create billing agreement token
    const agreementRes = await fetch(`${baseUrl}/v1/billing-agreements/agreement-tokens`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: `Payment for ${quantity}x Elec Chair`,
        payer: {
          payment_method: "PAYPAL",
        },
        plan: {
          type: "MERCHANT_INITIATED_BILLING_SINGLE_AGREEMENT",
          merchant_preferences: {
            return_url: returnUrl,
            cancel_url: cancelUrl,
            accepted_pymt_type: "INSTANT",
            skip_shipping_address: false,
            immutable_shipping_address: true,
          },
        },
        shipping_address: {
          line1: addressLine1 || "",
          line2: addressLine2 || "",
          city: city || "",
          postal_code: postalCode || "",
          country_code: "DE",
        },
      }),
    });

    const agreementData = await agreementRes.json();
    if (!agreementRes.ok) {
      console.error("PayPal agreement token error:", JSON.stringify(agreementData));
      throw new Error(`Failed to create agreement token: ${JSON.stringify(agreementData)}`);
    }

    return new Response(
      JSON.stringify({ tokenId: agreementData.token_id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
