"use client";
import React from "react";
import {Navbar, SectionTitle, Card, Button, Progress} from "@/components/ui";

const pillars = [
  {key:"earn",   title:"Earn",   desc:"Build stable, resilient income."},
  {key:"spend",  title:"Spend",  desc:"Align spending with your values."},
  {key:"save",   title:"Save",   desc:"Grow your safety net and goals."},
  {key:"borrow", title:"Borrow", desc:"Use credit as a tool, not a trap."},
  {key:"plan",   title:"Plan",   desc:"Protect tomorrow with smart moves."},
];

export default function AssessOverview(){
  return (
    <>
      <Navbar/>
      <main className="container" style={{paddingTop:28,paddingBottom:40}}>
        <SectionTitle eyebrow="Financial Health" title="Your 5-Pillar Assessment" desc="Get a kind, clear snapshot of where you are today and the next small step to grow." />
        <Card style={{padding:20, marginBottom:24}}>
          <div className="grid grid-2">
            <div>
              <div className="h2">What you’ll see</div>
              <ul style={{marginTop:10,color:"var(--muted)"}}>
                <li>• Scores for Earn, Spend, Save, Borrow, Plan</li>
                <li>• A total score out of 100</li>
                <li>• Gentle recommendations—no judgment</li>
              </ul>
              <div style={{marginTop:16}}>
                <Button asLinkHref="/assess/start">Start assessment</Button>
              </div>
            </div>
            <div>
              {/* preview skeleton */}
              {pillars.map((p,i)=>(
                <div key={p.key} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <strong>{p.title}</strong><span style={{color:"var(--muted)"}}>{12+i*2}/20</span>
                  </div>
                  <Progress value={(12+i*2)*5}/>
                </div>
              ))}
              <div style={{marginTop:10,display:"flex",justifyContent:"space-between"}}>
                <strong>Total</strong><strong>68/100</strong>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-2">
          {pillars.map(p=>(
            <Card key={p.key} style={{padding:18}}>
              <div className="h2">{p.title}</div>
              <p style={{color:"var(--muted)",margin:"8px 0 14px"}}>{p.desc}</p>
              <Progress value={0}/>
              <div style={{marginTop:10,display:"flex",justifyContent:"space-between",color:"var(--muted)"}}>
                <span>Score</span><span>—/20</span>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
