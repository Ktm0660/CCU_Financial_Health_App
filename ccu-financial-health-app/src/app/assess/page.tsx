"use client";

import { useState } from "react";

export default function AssessPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      monthlyIncome: Number(form.get("monthlyIncome") || 0),
      monthlyExpenses: Number(form.get("monthlyExpenses") || 0),
      emergencyFund: Number(form.get("emergencyFund") || 0),
      creditUtilization: form.get("creditUtilization") ? Number(form.get("creditUtilization")) : null,
      debts: [],
      goals: [],
    };

    const res = await fetch("/api/assess", { method: "POST", body: JSON.stringify(payload) });
    if (!res.ok) {
      const msg = await res.text();
      setError(msg || "Something went wrong");
      setLoading(false);
      return;
    }
    const { assessmentId } = await res.json();
    window.location.href = `/report/${assessmentId}`;
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Financial Health Check</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Monthly Income ($)" name="monthlyIncome" required />
        <Field label="Monthly Expenses ($)" name="monthlyExpenses" required />
        <Field label="Emergency Fund ($)" name="emergencyFund" required />
        <Field label="Credit Utilization (0–1, optional)" name="creditUtilization" min={0} max={1} step="0.01" />
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
