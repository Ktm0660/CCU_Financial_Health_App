"use client";

import { useState } from "react";
import { calcDTI, calcEmergencyMonths, calcSavingsProgress, normalizeTo100, scoreToBand, buildRecommendations } from "@/lib/health";

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try { return JSON.stringify(e); } catch { return "Something went wrong"; }
}

export default function AssessPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setLoading(true);

    const f = new FormData(e.currentTarget);
    const monthlyIncome = Number(f.get("monthlyIncome") || 0);
    const monthlyExpenses = Number(f.get("monthlyExpenses") || 0);
    const emergencyFund = Number(f.get("emergencyFund") || 0);
    const creditUtilization = f.get("creditUtilization") ? Number(f.get("creditUtilization")) : null;

    const mp1 = Number(f.get("minPay1") || 0);
    const mp2 = Number(f.get("minPay2") || 0);
    const mp3 = Number(f.get("minPay3") || 0);

    try {
      const dti = calcDTI({ monthlyIncome, debtsMinPayments: [mp1, mp2, mp3] });
      const emerg = calcEmergencyMonths({ monthlyExpenses, emergencyFund });
      const savings = calcSavingsProgress([]); // v1 simple
      const score = normalizeTo100(dti, emerg, savings, creditUtilization);
      const band = scoreToBand(score);
      const recs = buildRecommendations(dti, emerg, savings, creditUtilization);

      const params = new URLSearchParams({
        score: String(score),
        band,
        dti: dti.toFixed(4),
        emerg: emerg.toFixed(2),
        savings: savings.toFixed(4),
        credit: creditUtilization == null ? "" : String(creditUtilization),
        recs: encodeURIComponent(JSON.stringify(recs)),
      });
      window.location.href = \`/report?\${params.toString()}\`;
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Financial Health Check</h1>
      <p className="text-sm text-gray-600">This quick snapshot runs in your browser only.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Monthly Income ($)" name="monthlyIncome" required />
        <Field label="Monthly Expenses ($)" name="monthlyExpenses" required />
        <Field label="Emergency Fund ($)" name="emergencyFund" required />
        <Field label="Credit Utilization (0–1, optional)" name="creditUtilization" min={0} max={1} step="0.01" />
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Optional: Minimum Payments</div>
          <div className="grid grid-cols-3 gap-2">
            <input name="minPay1" type="number" step="0.01" placeholder="Debt 1" className="border p-2 rounded" />
            <input name="minPay2" type="number" step="0.01" placeholder="Debt 2" className="border p-2 rounded" />
            <input name="minPay3" type="number" step="0.01" placeholder="Debt 3" className="border p-2 rounded" />
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button disabled={loading} className="px-4 py-2 rounded bg-black text-white">
          {loading ? "Working..." : "See my report"}
        </button>
      </form>
    </main>
  );
}

function Field({ label, name, required, min, max, step }:
  { label: string; name: string; required?: boolean; min?: number; max?: number; step?: string }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input
        name={name}
        type="number"
        step={step ?? "0.01"}
        {...(min !== undefined ? { min } : {})}
        {...(max !== undefined ? { max } : {})}
        className="w-full border p-2 rounded"
        {...(required ? { required: true } : {})}
      />
    </div>
  );
}
