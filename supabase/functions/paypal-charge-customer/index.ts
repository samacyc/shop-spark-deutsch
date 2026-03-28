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
    const { customerId, amount, adminPassword } = await req.json();

    if (!adminPassword || adminPassword !== Deno.env.get("ADMIN_PASSWORD")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!customerId || !amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid customer or amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get customer
    const { data: customer, error: custErr } = await supabase
      .from("customers")
      .select("*")
      .eq("id", customerId)
      .single();

    if (custErr || !customer) throw new Error("Customer not found");
    if (!customer.billing_agreement_id) throw new Error("No billing agreement for this customer");

    const creds = await getPayPalCredentials(supabase);
    const { accessToken, baseUrl } = await getPayPalAccessToken(
      creds.client_id,
      creds.client_secret,
      creds.is_sandbox
    );

    // Create reference transaction using billing agreement
    const paymentRes = await fetch(`${baseUrl}/v1/payments/payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "sale",
        payer: {
          payment_method: "PAYPAL",
          funding_instruments: [
            {
              billing: {
                billing_agreement_id: customer.billing_agreement_id,
              },
            },
          ],
        },
        transactions: [
          {
            amount: {
              total: amount.toFixed(2),
              currency: "EUR",
            },
            description: `Charge for ${customer.name}`,
          },
        ],
      }),
    });

    const paymentData = await paymentRes.json();
    if (!paymentRes.ok) {
      console.error("PayPal charge error:", JSON.stringify(paymentData));
      throw new Error(`Payment failed: ${paymentData.message || JSON.stringify(paymentData)}`);
    }

    // Record transaction
    await supabase.from("transactions").insert({
      customer_id: customerId,
      amount,
      currency: "EUR",
      status: paymentData.state === "approved" ? "completed" : "failed",
      paypal_payment_id: paymentData.id,
      description: `Admin charge: €${amount.toFixed(2)}`,
    });

    return new Response(
      JSON.stringify({ success: true, paymentId: paymentData.id, state: paymentData.state }),
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
