import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, DollarSign, Settings, Users, CreditCard, Eye, EyeOff, LogOut } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  billing_agreement_id: string | null;
  city: string | null;
  created_at: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  created_at: string;
  customers?: { name: string; email: string } | null;
}

interface Credentials {
  client_id: string;
  client_secret: string;
  vite_client_id: string;
  is_sandbox: boolean;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"customers" | "credentials" | "transactions">("customers");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charge modal
  const [chargeCustomer, setChargeCustomer] = useState<Customer | null>(null);
  const [chargeAmount, setChargeAmount] = useState("");
  const [charging, setCharging] = useState(false);
  const [chargeResult, setChargeResult] = useState<string | null>(null);

  // Credentials form
  const [editCreds, setEditCreds] = useState({ clientId: "", clientSecret: "", viteClientId: "", isSandbox: true });
  const [savingCreds, setSavingCreds] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const storedPass = useCallback(() => {
    return sessionStorage.getItem("admin_pass") || "";
  }, []);

  const apiCall = useCallback(
    async (action: string, extra: any = {}) => {
      const pwd = sessionStorage.getItem("admin_pass") || password;
      const { data, error } = await supabase.functions.invoke("admin-api", {
        method: "POST",
        body: { action, adminPassword: pwd, ...extra },
      });
      if (error) throw error;
      if (data?.error) {
        if (data.error === "Unauthorized") {
          sessionStorage.removeItem("admin_pass");
          setAuthenticated(false);
          setPassword("");
        }
        throw new Error(data.error);
      }
      return data;
    },
    [password]
  );

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      sessionStorage.setItem("admin_pass", password);
      await apiCall("get_customers");
      setAuthenticated(true);
    } catch {
      setError("Invalid password");
      sessionStorage.removeItem("admin_pass");
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiCall("get_customers");
      setCustomers(data.customers || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiCall("get_transactions");
      setTransactions(data.transactions || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const loadCredentials = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiCall("get_credentials");
      setCredentials(data.credentials);
      setEditCreds({
        clientId: data.credentials.client_id || "",
        clientSecret: "",
        viteClientId: data.credentials.vite_client_id || "",
        isSandbox: data.credentials.is_sandbox,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    if (!authenticated) return;
    if (activeTab === "customers") loadCustomers();
    else if (activeTab === "credentials") loadCredentials();
    else if (activeTab === "transactions") loadTransactions();
  }, [authenticated, activeTab, loadCustomers, loadCredentials, loadTransactions]);

  // Auto-login from session — verify password before granting access
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_pass");
    if (stored) {
      setPassword(stored);
      (async () => {
        try {
          const { data, error } = await supabase.functions.invoke("admin-api", {
            method: "POST",
            body: { action: "get_customers", adminPassword: stored },
          });
          if (error || data?.error) {
            sessionStorage.removeItem("admin_pass");
            return;
          }
          setAuthenticated(true);
        } catch {
          sessionStorage.removeItem("admin_pass");
        }
      })();
    }
  }, []);

  const handleCharge = async () => {
    if (!chargeCustomer || !chargeAmount) return;
    const amt = parseFloat(chargeAmount);
    if (isNaN(amt) || amt <= 0) {
      setChargeResult("Please enter a valid amount.");
      return;
    }
    setCharging(true);
    setChargeResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("paypal-charge-customer", {
        method: "POST",
        body: {
          customerId: chargeCustomer.id,
          amount: amt,
          adminPassword: sessionStorage.getItem("admin_pass"),
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setChargeResult(`✅ Charged €${amt.toFixed(2)} successfully (ID: ${data.paymentId})`);
      loadCustomers();
    } catch (err: any) {
      setChargeResult(`❌ ${err.message}`);
    } finally {
      setCharging(false);
    }
  };

  const handleSaveCredentials = async () => {
    setSavingCreds(true);
    try {
      const body: any = {
        clientId: editCreds.clientId,
        viteClientId: editCreds.viteClientId,
        isSandbox: editCreds.isSandbox,
      };
      if (editCreds.clientSecret) {
        body.clientSecret = editCreds.clientSecret;
      }
      await apiCall("update_credentials", body);
      await loadCredentials();
      setError("");
      alert("Credentials saved successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingCreds(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-sm bg-card border rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter admin password"
            className="w-full border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
          />
          {error && <p className="text-sm text-destructive mb-3">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_pass");
              setAuthenticated(false);
              setPassword("");
            }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-card">
        <div className="container flex gap-1">
          {[
            { key: "customers" as const, label: "Customers", icon: Users },
            { key: "transactions" as const, label: "Transactions", icon: CreditCard },
            { key: "credentials" as const, label: "PayPal Settings", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="container py-8">
        {error && (
          <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* CUSTOMERS TAB */}
        {!loading && activeTab === "customers" && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Customers ({customers.length})
            </h2>
            {customers.length === 0 ? (
              <p className="text-muted-foreground text-sm">No customers yet.</p>
            ) : (
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">City</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Agreement</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Total Charged</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                      <th className="text-right px-4 py-3 font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => {
                      const totalCharged = (c.transactions || [])
                        .filter((t) => t.status === "completed")
                        .reduce((sum, t) => sum + Number(t.amount), 0);
                      return (
                        <tr key={c.id} className="border-t hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 text-foreground font-medium">{c.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                          <td className="px-4 py-3 text-muted-foreground">{c.city || "—"}</td>
                          <td className="px-4 py-3">
                            {c.billing_agreement_id ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                                Active
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">None</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-foreground font-medium">
                            €{totalCharged.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">
                            {new Date(c.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {c.billing_agreement_id ? (
                              <button
                                onClick={() => {
                                  setChargeCustomer(c);
                                  setChargeAmount("");
                                  setChargeResult(null);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                              >
                                <DollarSign className="w-3.5 h-3.5" />
                                Charge
                              </button>
                            ) : (
                              <span className="text-xs text-muted-foreground">No agreement</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TRANSACTIONS TAB */}
        {!loading && activeTab === "transactions" && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Recent Transactions ({transactions.length})
            </h2>
            {transactions.length === 0 ? (
              <p className="text-muted-foreground text-sm">No transactions yet.</p>
            ) : (
              <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Customer</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Amount</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Description</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="border-t hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-foreground">
                          {(t.customers as any)?.name || "Unknown"}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          €{Number(t.amount).toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                              t.status === "completed"
                                ? "bg-accent text-accent-foreground"
                                : t.status === "failed"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {t.description || "—"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">
                          {new Date(t.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CREDENTIALS TAB */}
        {!loading && activeTab === "credentials" && (
          <div className="max-w-lg">
            <h2 className="text-lg font-bold text-foreground mb-4">PayPal API Settings</h2>
            <div className="bg-card border rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  PayPal Client ID (Server)
                </label>
                <input
                  type="text"
                  value={editCreds.clientId}
                  onChange={(e) => setEditCreds({ ...editCreds, clientId: e.target.value })}
                  placeholder="AV..."
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  PayPal Secret
                </label>
                <div className="relative">
                  <input
                    type={showSecret ? "text" : "password"}
                    value={editCreds.clientSecret}
                    onChange={(e) => setEditCreds({ ...editCreds, clientSecret: e.target.value })}
                    placeholder={
                      credentials?.client_secret
                        ? `Current: ${credentials.client_secret}`
                        : "Enter secret..."
                    }
                    className="w-full border rounded-lg px-4 py-3 pr-10 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to keep the current secret unchanged.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  PayPal Client ID (Frontend / VITE)
                </label>
                <input
                  type="text"
                  value={editCreds.viteClientId}
                  onChange={(e) => setEditCreds({ ...editCreds, viteClientId: e.target.value })}
                  placeholder="AV..."
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This is loaded by the checkout page to render PayPal buttons.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editCreds.isSandbox}
                    onChange={(e) => setEditCreds({ ...editCreds, isSandbox: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
                <span className="text-sm text-foreground">Sandbox Mode</span>
              </div>
              <button
                onClick={handleSaveCredentials}
                disabled={savingCreds}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {savingCreds && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Charge Modal */}
      {chargeCustomer && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setChargeCustomer(null)}
        >
          <div className="bg-card border rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-foreground mb-1">Charge Customer</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {chargeCustomer.name} ({chargeCustomer.email})
            </p>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Amount (EUR)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
                placeholder="0.00"
                className="w-full border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
            </div>
            {chargeResult && (
              <p
                className={`text-sm mb-3 ${
                  chargeResult.startsWith("✅") ? "text-accent-foreground" : "text-destructive"
                }`}
              >
                {chargeResult}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setChargeCustomer(null)}
                className="flex-1 border rounded-lg py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCharge}
                disabled={charging || !chargeAmount}
                className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {charging && <Loader2 className="w-4 h-4 animate-spin" />}
                Charge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
