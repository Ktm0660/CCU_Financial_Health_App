import Container from './Container';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-6 sm:pt-10">
      <Container>
        <div className="card p-6 sm:p-8 bg-gradient-to-b from-[#F6FAFD] to-white">
          <h1 className="text-display font-semibold text-[color:#0D3554]">Money, made simpler.</h1>
          <p className="mt-3 text-slate-600 max-w-prose">
            Short checkup. Clear next steps. Transparent products that fit your life.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/assess" className="gradient-btn inline-flex min-h-[44px] items-center justify-center px-6 py-3 font-semibold">
              Take the 2-minute checkup
            </Link>
            <Link
              href="/products"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[color:#0E7DB6]/30 px-6 py-3 text-[color:#0E7DB6] hover:bg-[rgb(14,125,182,0.06)]"
            >
              Explore products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
