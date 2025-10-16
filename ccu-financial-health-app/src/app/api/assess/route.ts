import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { calcDTI, calcEmergencyMonths, calcSavingsProgress, normalizeTo100, scoreToBand, buildRecommendations } from "@/lib/health";

const schema = z.object({
  monthlyIncome: z.number().nonnegative(),
  monthlyExpenses: z.number().nonnegative(),
  emergencyFund: z.number().nonnegative(),
  creditUtilization: z.number().min(0).max(1).nullable().optional(),
  debts: z.array(z.object({
    name: z.string(),
    balance: z.number().nonnegative(),
    interestRate: z.number().min(0),
    minimumPayment: z.number().nonnegative(),
  })).default([]),
  goals: z.array(z.object({
    name: z.string(),
    targetAmount: z.number().positive(),
    currentAmount: z.number().min(0),
  })).default([]),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = schema.parse(body);

  const profile = await prisma.memberProfile.create({
    data: {
      monthlyIncome: data.monthlyIncome,
      monthlyExpenses: data.monthlyExpenses,
      emergencyFund: data.emergencyFund,
      creditUtilization: data.creditUtilization ?? null,
      debts: { create: data.debts },
      goals: { create: data.goals },
    },
    include: { debts: true, goals: true },
  });

  const inputs = {
    monthlyIncome: Number(profile.monthlyIncome),
    monthlyExpenses: Number(profile.monthlyExpenses),
    emergencyFund: Number(profile.emergencyFund),
    debts: profile.debts.map(d => ({ minimumPayment: Number(d.minimumPayment) })),
    creditUtilization: profile.creditUtilization ?? null,
  };

  const dti = calcDTI(inputs);
  const emerg = calcEmergencyMonths(inputs);
  const savings = calcSavingsProgress(profile.goals.map(g => ({
    targetAmount: Number(g.targetAmount),
    currentAmount: Number(g.currentAmount),
  })));

  const score = normalizeTo100(dti, emerg, savings, inputs.creditUtilization);
  const band = scoreToBand(score);
  const recs = buildRecommendations({ dti, emerg, savings, creditUtil: inputs.creditUtilization });

  const assessment = await prisma.assessment.create({
    data: {
      profileId: profile.id,
      dti, emergencyMonths: emerg, savingsProgress: savings,
      creditUtil: inputs.creditUtilization,
      fhiScore: score,
      band,
      recommendations: recs,
    }
  });

  return NextResponse.json({ assessmentId: assessment.id }, { status: 201 });
}
