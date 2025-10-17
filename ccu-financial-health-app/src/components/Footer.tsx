import Container from './Container';
export default function Footer() {
  return (
    <footer className="mt-14 sm:mt-20 border-t border-slate-200/70 bg-white">
      <Container className="py-8 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Connections Credit Union · Federally insured by NCUA · Equal Housing Lender</p>
      </Container>
    </footer>
  );
}
