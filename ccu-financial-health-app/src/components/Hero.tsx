import Container from "./Container";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-2 sm:pt-4">
      <Container>
        <div className="card card-pad sm:p-8 bg-gradient-to-b from-brand-sky/60 to-white">
          <h1 className="section-title sm:text-4xl">Money, made simpler.</h1>
          <p className="section-sub mt-3 max-w-prose text-lg">
            Short checkup. Clear next steps. Transparent products that fit your life.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:flex-nowrap">
            <Link href="/assess" className="btn-primary min-w-[48%] sm:min-w-[0]">
              Take the 2-minute checkup
            </Link>
            <Link href="/products" className="btn-ghost min-w-[48%] sm:min-w-[0]">
              Explore products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
