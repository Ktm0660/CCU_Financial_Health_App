"use client";
import React from "react";
import Link from "next/link";
export function Card(props:{children:React.ReactNode,className?:string,style?:React.CSSProperties}){return <div className={`card ${props.className??""}`} style={props.style}>{props.children}</div>;}
export function SectionTitle({eyebrow,title,desc}:{eyebrow?:string;title:string;desc?:string}){return (
  <header style={{marginBottom:16}}>
    {eyebrow ? <div className="badge" style={{marginBottom:10}}>{eyebrow}</div> : null}
    <div className="h1">{title}</div>
    {desc ? <p className="lead" style={{marginTop:10}}>{desc}</p> : null}
  </header>
);} 
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {asLinkHref?:string};
export function Button({asLinkHref,className,children,style,...rest}:ButtonProps) {
  if (asLinkHref){return <Link className={`btn ${className??""}`} href={asLinkHref} style={style}>{children}</Link>}
  return <button {...rest} className={`btn ${className??""}`} style={style}>{children}</button>;
}
export function Progress({value}:{value:number}){const v=Math.max(0,Math.min(100,value||0));return(<div className="progress"><span style={{width:`${v}%`}}/></div>)}
export function Navbar(){
  return (
    <nav style={{position:"sticky",top:0,zIndex:50,backdropFilter:"saturate(180%) blur(8px)",background:"rgba(255,255,255,.8)",borderBottom:"1px solid #e5e7eb"}}>
      <div className="container" style={{display:"flex",alignItems:"center",gap:16}}>
        <Link href="/" className="h2" style={{display:"inline-flex",alignItems:"center",gap:10}}>
          <span style={{display:"inline-block",width:28,height:28,borderRadius:8,background:"var(--brand)"}}/>
          Connections CU
        </Link>
        <div style={{marginLeft:"auto",display:"flex",gap:14}}>
          <Link className="link" href="/assess">Assessment</Link>
          <Link className="link" href="/learn">Learn</Link>
        </div>
      </div>
    </nav>
  );
}
