'use client';
import { redirect } from 'next/navigation';

export default function Page() {
  // Forward any app-router reference to the Pages Router route
  redirect('/assessment');
  return null;
}
