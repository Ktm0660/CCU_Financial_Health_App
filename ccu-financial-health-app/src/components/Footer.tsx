import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-14 sm:mt-20 border-t border-brand-navy/10 bg-white/80">
      <Container className="py-8 text-sm text-brand-navy/70">
        <p>© {new Date().getFullYear()} Connections Credit Union · Federally insured by NCUA · Equal Housing Lender</p>
      </Container>
    </footer>
  );
}
