import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">CCU Financial Health</h1>
      <p className="text-gray-600">Take a quick, private snapshot of your financial health.</p>
      <Link href="/assess" className="px-4 py-2 rounded bg-black text-white">Start Assessment</Link>
    </main>
  );
}
