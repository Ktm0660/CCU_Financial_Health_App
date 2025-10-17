export default function Footer(){
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-[var(--ink-2)]">
        © {new Date().getFullYear()} Connections Credit Union — All rights reserved.
      </div>
    </footer>
  );
}
