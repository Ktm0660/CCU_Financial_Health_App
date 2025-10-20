import Link from 'next/link';

export default function Hero() {
  return (
    <div className="space-y-4 bg-gradient-to-b from-[#F6FAFD] to-white rounded-[inherit]">
      <div>
        <h1>Money, made simpler.</h1>
        <p className="mt-3 text-slate-600 max-w-prose">
          Short checkup. Clear next steps. Transparent products that fit your life.
        </p>
      </div>
      <div className="stack mt-6">
        <Link href="/assess" className="btn btn-primary">
          Take the 2-minute checkup
        </Link>
        <Link href="/products" className="btn btn-ghost">
          Explore products
        </Link>
      </div>
    </div>
  );
}
