import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    const { tokenId, name, email, addressLine1, addressLine2, city, postalCode, amount, quantity } = await req.json();

    if (!tokenId || !name || !email) {
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

    // Execute billing agreement
    const executeRes = await fetch(`${baseUrl}/v1/billing-agreements/agreements`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token_id: tokenId }),
    });

    const executeData = await executeRes.json();
    if (!executeRes.ok) {
      console.error("PayPal execute error:", JSON.stringify(executeData));
      throw new Error(`Failed to execute agreement: ${JSON.stringify(executeData)}`);
    }

    const billingAgreementId = executeData.id;

    // Save customer
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        name,
        email,
        billing_agreement_id: billingAgreementId,
        address_line1: addressLine1 || null,
        address_line2: addressLine2 || null,
        city: city || null,
        postal_code: postalCode || null,
      })
      .select()
      .single();

    if (customerError) {
      console.error("Customer insert error:", customerError);
      throw new Error("Failed to save customer");
    }

    // Record initial transaction
    await supabase.from("transactions").insert({
      customer_id: customer.id,
      amount: amount || 0,
      currency: "EUR",
      status: "completed",
      paypal_payment_id: billingAgreementId,
      description: `Initial payment: ${quantity}x Elec Chair`,
    });

    return new Response(
      JSON.stringify({ success: true, billingAgreementId, customerId: customer.id }),
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
