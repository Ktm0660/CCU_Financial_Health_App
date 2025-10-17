"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { href:"/", en:"Home", es:"Inicio" },
  { href:"/assess", en:"Assessment", es:"Evaluación" },
  { href:"/products", en:"Products", es:"Productos" },
  { href:"/resources", en:"Resources", es:"Recursos" },
];

export default function NavBar(){
  const path = usePathname();
  const [es,setEs]=useState(false);
  useEffect(()=>{ setEs(typeof window!=="undefined" && localStorage.getItem("ccu_lang")==="es"); },[]);
  const toggle=()=>{ const nx=!es; setEs(nx); if(typeof window!=="undefined"){ localStorage.setItem("ccu_lang", nx?"es":"en"); }};

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide text-[var(--ink)]">
          Connections CU · <span className="text-[var(--accent)]">Financial Wellness</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {items.map(it=>{
            const active = path===it.href;
            return (
              <Link key={it.href} href={it.href}
                className={`text-sm ${active?"text-[var(--accent)] font-semibold":"text-[var(--ink-2)] hover:text-[var(--accent)]"}`}>
                {es?it.es:it.en}
              </Link>
            );
          })}
          <button onClick={toggle}
            className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)] hover:bg-[var(--bg)]">
            {es?"ESPAÑOL ✓":"ESPAÑOL"}
          </button>
        </nav>
        <button onClick={toggle} className="md:hidden rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)]">
          {es?"ES ✓":"ES"}
        </button>
      </div>
    </header>
  );
}
